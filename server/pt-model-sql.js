const mysql = require("mysql");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/**
 * A function that connects the server with a remote mySQL DB.
 * 
 * The credentials for the connection are retrieved from the enviromental variables.
 * - In development: The env vars are stored in the .env file in the root folder.
 * - In production: The env vars are stored on Heroku, "Settings" > "Config Vars".
 * @access private
 * 
 * @returns {mysql.Connection} An mysql.Connection object, used for queries.
 */
function connectToDB (){
    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER_DB,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        multipleStatements: true
    });
}

//============================================ exported Functions ==============================================================

/**
 * A callback, whose inputs are an error message and the retrieved data.
 * 
 * @callback ticketPricesCallback
 * @param {String} err - An error message.
 * @param {Array.<JSON>} results An array of JSON Objects\. Its length is 2, one for every mySQL query.
 */
/**
 * A function that retrieves the ticket prices from the DB.
 * 
 * @param {ticketPricesCallback} callback The callback that handles the error message and the retrieved data.
 */
exports.ticketsPrices = (callback) => {
    con = connectToDB();

    con.connect((err) => {
        if(err) console.log(err);
        //console.log("Connected!");

        con.query("SELECT * FROM Eisitirio ORDER BY Eisitirio.zoni;\
        SELECT * FROM MiniaiaKarta ORDER BY MiniaiaKarta.zoni", (err, results, fields) => {
            if (err) callback(err, null);
            callback(null, results);
            con.end();
        });


    });
}


/**
 * A callback, whose inputs are an error message and the retrieved data.
 * 
 * @callback modelCallback
 * 
 * @param {String} err An error message.
 * @param {Array.<JSON>} results An array of the retrieved data, which are JSON objects.
 */
/**
 * A function that retrieves the lines names from the DB.
 * 
 * @param {modelCallback} callback The callback that handles the error message and the retrieved data.
 */
exports.linesNames = (callback) => {
    con = connectToDB();

    con.connect((err) => {
        if(err) console.log(err);
        //console.log("Connected!");

        con.query("SELECT * FROM Grammi ORDER BY Grammi.id", (err, results, fields) => {
            if (err) callback(err, null);
            callback(null, results);
            con.end();
        });

    });
}

/**
 * A function that retrieves the artciles from the DB.
 * 
 * @param {modelCallback} callback The callback that handles the error message and the retrieved data.
 */
exports.getArticles = (callback) => {
    con = connectToDB();

    con.connect((err)=>{
        if (err) console.log(err)

        con.query("SELECT * FROM Nea ORDER BY Nea.imerominia DESC", (err, results, fields) => {
            if (err) callback(err, null);
            callback(null, results);
            con.end();
        });
    });
}

/**
 * A function that retrieves the articles and lines from the DB
 * 
 * @param {modelCallback} callback The callback that handles the error message and the retrieved data.
 */
exports.getArticlesAndLines = (callback) => {
    con = connectToDB();

    con.connect((err)=>{
        if (err) console.log(err)

        con.query("SELECT * FROM Nea ORDER BY Nea.imerominia DESC;\
        SELECT * FROM Grammi ORDER BY Grammi.id", (err, results, fields) => {
            if (err) callback(err, null);
            callback(null, results);
            con.end();
        });
    });
}


/**
 * A function that retrieves a line's route.
 * 
 * @param {String} lineId The id of the line.
 * @param {modelCallback} callback The callback that handles the error message and the retrieved data.
 */
exports.getLineDetails = (lineId, callback) => {
    con = connectToDB();

    con.connect((err)=>{
        if (err) console.log(err)

        con.query("SELECT Pernaei.seira, Pernaei.ora, Pernaei.imera, Stasi.onoma AS 'onomaStasis', Stasi.geografikiThesi, Stasi.zoni, Stasi.dieuthinsi, Grammi.onoma AS 'onomaGrammis' \
        FROM ((Pernaei JOIN Stasi ON Pernaei.stasiID = Stasi.id) JOIN Grammi ON Pernaei.grammiID = Grammi.id) \
        WHERE Pernaei.grammiID = ? \
        ORDER BY Pernaei.seira ASC", [lineId], (err, results, fields) => {
            if (err) callback(err, null);
            
            callback(null, results);
            con.end();
        });
    });
}