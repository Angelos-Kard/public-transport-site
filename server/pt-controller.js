'use strict';

const model = require("./pt-model-sql");

exports.homePage = (req, res) => {
    res.render("home_page", 
    {
        layout: "main.hbs", 
        title:"Αστικές Συγκοινωνίες",
        styles: [
            {cssFile: "style.css"},
            {cssFile: "header_style.css"},
            {cssFile: "footer_style.css"},
            {cssFile: "form_style.css"}
        ]
    });
}

