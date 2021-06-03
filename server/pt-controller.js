'use strict';

const model = require("./pt-model-sql");

/**
 * Renders site's home page.
 * 
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 */
exports.homePage = (req, res) => {

    model.getArticles((err, results) => {
        const someNews = [];

        results = fixDates(results);
        
        for (let i = 0; i < 3; i++)
        {
            someNews.push(results[i]);
        }

        res.render("home_page", 
        {
            layout: "main.hbs", 
            title:"Αστικές Συγκοινωνίες",
            news: someNews,
            styles: [
                {cssFile: "style.css"},
                {cssFile: "form_style.css"}
            ],
            scripts: [
                //{jsFile: "news.js"},
                {jsFile: "newsHome.js"}
            ]
        });
    })
    
}

/**
 * Renders site's news page, after retrieving articles from DB.
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 * 
 * @see getArticles
 */
exports.newsPage = (req, res) => {

    model.getArticles((err,results) => {
        if (err) console.log(err);
        
        results = fixDates(results);

        res.render("news", 
        {
            layout: "main.hbs", 
            title:"Ανακοινώσεις",
            styles: [
                {cssFile: "news_style.css"}
            ],
            scripts: [
                //{jsFile: "news.js"},
                //{jsFile: "newsArticle.js"},
                {jsFile: "redirect.js"}
            ],
            news: results
        });
    })
}

/**
 * Renders site's route page, after retrieving lines' names from DB.
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 * 
 * @see linesNames
 */
exports.routePage = (req, res) => {

    model.linesNames((err,results) => {
        if (err) console.log(err);

        const rows = rowpacketToJSON("lines", results);

        res.render("route", 
        {
            layout: "main.hbs", 
            title:"Δρομολόγια",
            styles: [
                {cssFile: "variables.css"},
                {cssFile: "route_style.css"}
            ],
            scripts: [
                //{jsFile: "lines.js"},
                {jsFile: "redirect.js"}
            ],
            lines: results
        });
    })
    
}

/**
 * Renders site's tickets page, after tickets' prices from DB.
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 * 
 * @see ticketsPrices
 */
exports.ticketsPage = (req, res) => {

    model.ticketsPrices((err, results) => {
        if(err) console.log(err);
        
        const rows = rowpacketToJSON("tickets", results[0]);

        const rows2 = rowpacketToJSON("monthly", results[1]);

        //console.log(typeof JSON.stringify(rows.tickets));
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
        ],
        tickets: rows.tickets,
        monthly: rows2.monthly
        });

    });
    
}


/**
 * Renders site's contact page.
 * 
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 * 
 */
exports.contactPage = (req, res) => {
    res.render("contact", 
    {
        layout: "main.hbs", 
        title:"Εισιτήρια",
        styles: [
            {cssFile: "style_contact.css"},
            {cssFile: "form_style.css"}
        ],
        scripts: [
            {jsFile: "redirect.js"}
        ]
    });
}

/**
 * Renders site's page for a specific line, after retrieving its route from DB.
 * 
 * @param {Request} req Request Object.
 * @param {Response} res Response Object.
 * 
 */
exports.specificRoutePage = (req, res) => {

    model.getLineDetails(req.params.routeID, (err, results) => {

        if (results[0] == undefined) res.redirect("/route");
        else
        {

            const daysAndTime = fixBusStopsTimetable(results[0].ora, results[0].imera);

            res.render("route_specific", 
            {
                layout: "main.hbs",
                title: req.params.routeID + " - " + results[0].onomaGrammis,
                lineName: req.params.routeID + ' - "' + results[0].onomaGrammis + '"',
                bus_stop: results,
                day_time: daysAndTime, 
                styles: [
                    {cssFile: "variables.css"},
                    {cssFile: "routeSpecific_style.css"}
                ],
                scripts: [
                    {jsFile: "accordion.js"},
                    {jsFile: "redirect.js"}
                ]
            });
        }
        
    })
    
}

/**
 * Clicking on link with the format "*.html", it redirects the user to the corresponding page.
 * 
 * This function was created due to the fact that many links in the site was of this format. 
 * 
 * @param {Request} req Request Object.
 * @param {Response} res Response Object.
 */
exports.htmlRedirection = (req, res) => {
    const newPath = req.route.path.slice(0,-5);
    //console.log(req);
    res.redirect(newPath);
}

/**
 * A function that creates a JSON object, which contains an array of JSON objects.
 * 
 * @access private
 * 
 * @param {String} arg Keys's name, whose value is the array.
 * @param {Array<JSON>} rows An array, which contains JSON objects. 
 * @returns {JSON} A JSON object with the array of JSON objects.
 */
function rowpacketToJSON (arg, rows) {

    let JSONobject = {[arg]:[]}

    for (let i in rows)
    {
        //console.log(rows[i]);
        JSONobject[arg].push(rows[i])
    }

    return JSONobject;
}

/**
 * A function that changes the format of the date.
 * 
 * - Input: An array of JSON objects, where the dates are stored under the key "imerominia" and they are Date objects\.
 * - Output: An array of JSON objects, where the dates are stored under the key "imerominia" and they are String objects\. 
 * Date's format is "dd/MM/YYYY".
 * 
 * @access private
 * 
 * @param {Array.<{id: Number, titlos: String, imerominia: Date, keimeno: String}>} results An array of JSON objects.
 * @returns {Array.<{id: Number, titlos: String, imerominia: Date, keimeno: String}>} Returns the same array of JSON objects, but the dates' format is "dd/MM/YYYY".
 */
function fixDates (results) {
    for (let i in results)
    {
        const newDate = results[i].imerominia.getDate() 
                + "/" + (results[i].imerominia.getMonth()+1) 
                + "/" + results[i].imerominia.getFullYear();

        results[i].imerominia = newDate;
    }
    return results;
}

/**
 * A function that fixes the format of days and hours of the routes in order to be handled by hbs. 
 * 
 * @access private
 * 
 * @param {String} time 
 * @param {String} days 
 * @returns {Array.<JSON>} An array of JSON objects.
 */
function fixBusStopsTimetable (time, days) {

    const daysOfWeek = ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή", "Αργίες"];
    const newAr = [];
    const newTime = time.split("/");
    const newDays = days.split("/");



    for (let i in newTime)
    {
        let accum = [];
        newTime[i] = newTime[i].split(",")

        for (let j = 0; j < 8; j++)
        {
            if (newDays[i][j] != "_") accum.push(daysOfWeek[j]);
        }

        newAr.push({"days": accum.join(", "), time: newTime[i]})
    }
    
    return newAr;

}