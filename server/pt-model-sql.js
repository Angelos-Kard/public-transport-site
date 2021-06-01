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
        database: process.env.DB_NAME
    });

    // console.log(process.env.HOST,
    //     process.env.USER,
    //     process.env.PASSWORD,
    //     process.env.DB_PORT,
    //     process.env.DB_NAME);
}

exports.ticketsPrices = (callback) => {
    con = connectToDB();
    
    let resultsToRetrun;

    con.connect((err) => {
        if(err) console.log(err);
        //console.log("Connected!");

        con.query("SELECT * FROM Eisitirio ORDER BY Eisitirio.zoni", (err, results, fields) => {
            if (err) callback(err, null);
            callback(null, results);
            con.end();
        })


    });
}