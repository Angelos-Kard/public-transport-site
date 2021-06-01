'use strict';

const model = require("./pt-model-sql");

exports.homePage = (req, res) => {
    res.render("home_page", 
    {
        layout: "main.hbs", 
        title:"Αστικές Συγκοινωνίες",
        styles: [
            {cssFile: "style.css"},
            {cssFile: "form_style.css"}
        ],
        scripts: [
            {jsFile: "news.js"},
            {jsFile: "newsHome.js"}
        ]
    });
}

exports.newsPage = (req, res) => {
    res.render("news", 
    {
        layout: "main.hbs", 
        title:"Ανακοινώσεις",
        styles: [
            {cssFile: "news_style.css"}
        ],
        scripts: [
            {jsFile: "news.js"},
            {jsFile: "newsArticle.js"},
            {jsFile: "redirect.js"}
        ]
    });
}

exports.routePage = (req, res) => {
    res.render("route", 
    {
        layout: "main.hbs", 
        title:"Δρομολόγια",
        styles: [
            {cssFile: "route_style.css"}
        ],
        scripts: [
            {jsFile: "lines.js"},
            {jsFile: "redirect.js"}
        ]
    });
}

exports.ticketsPage = (req, res) => {
    res.render("tickets", 
    {
        layout: "main.hbs", 
        title:"Εισιτήρια",
        styles: [
            {cssFile: "style_tickets.css"}
        ],
        scripts: [
            {jsFile: "tickets.js"},
            {jsFile: "redirect.js"}
        ]
    });
}

exports.contactPage = (req, res) => {
    res.render("contact", 
    {
        layout: "main.hbs", 
        title:"Εισιτήρια",
        styles: [
            {cssFile: "style_contact.css"},
            {cssFile: "form_style.css"}
        ]
    });
}


exports.htmlRedirection = (req, res) => {

    const newPath = req.route.path.slice(0,-5);
    //console.log(req);
    res.redirect(newPath);
}

