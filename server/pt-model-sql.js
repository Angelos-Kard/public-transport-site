const mysql = require("mysql");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

function connectToDB (){
    return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        multipleStatements: true
    });
}

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