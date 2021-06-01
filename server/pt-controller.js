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
        ],
        scripts: [
            {jsFile: "nav.js"},
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
            {cssFile: "news_style.css"},
            {cssFile: "header_style.css"},
            {cssFile: "footer_style.css"}
        ],
        scripts: [
            {jsFile: "nav.js"},
            {jsFile: "news.js"},
            {jsFile: "newsArticle.js"},
            {jsFile: "redirect.js"}
        ]
    });
}


exports.htmlRedirection = (req, res) => {

    const newPath = req.route.path.slice(0,-5);
    //console.log(req);
    res.redirect(newPath);
}

