'use strict';



const model = require("./pt-model-sql");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const API_KEY = process.env.GOOGLE_KEY;

const fetch = require("node-fetch");

const example = {
    destination_addresses: ["Λεωφ. Ιπποκράτους, Πάτρα 265 04, Ελλάδα", "Λεωφ. Ιπποκράτους, Πάτρα 265 04, Ελλάδα", "Σουλίου 5, Ρίο 265 04, Ελλάδα", "Λεωφ. Ιπποκράτους, Πάτρα 265 04, Ελλάδα", "Erasmou, Panepistimioupoli Patron 265 04, Ελλάδα"],
    origin_addresses: ["Μαραθώνιας Διαδρομής 47, Αχαρνές 136 72, Ελλάδα"],
    rows: [
        {
            elements: [
                {
                    distance: {text: "211 χλμ", value: 210625},
                    duration: {text: "1 μέρες 19 ώρες", value: 154937},
                    status: "OK"
                }
            ]
        },
        {
            elements: [
                {
                    distance: {text: "211 χλμ", value: 210982},
                    duration: {text: "1 μέρες 19 ώρες", value: 155209},
                    status: "OK"
                }
            ]
        },
        {
            elements: [
                {
                    distance: {text: "211 χλμ", value: 211148},
                    duration: {text: "1 μέρες 19 ώρες", value: 155327},
                    status: "OK"
                }
            ]
        },
        {
            elements: [
                {
                    distance: {text: "212 χλμ", value: 211513},
                    duration: {text: "1 μέρες 19 ώρες", value: 155598},
                    status: "OK"
                }
            ]
        },
        {
            elements: [
                {
                    distance: {text: "212 χλμ", value: 211849},
                    duration: {text: "1 μέρες 19 ώρες", value: 155879},
                    status: "OK"
                }
            ]
        },
    ]
}

/**
 * Renders site's home page.
 * 
 * @param {Request} [req] Request Object.
 * @param {Response} res Response Object.
 */
exports.homePage = (req, res) => {

    model.getArticlesAndLines((err, results) => {
        const someNews = [];

        results[0] = fixDates(results[0]);
        
        for (let i = 0; i < 3; i++)
        {
            someNews.push(results[0][i]);
        }

        res.render("home_page", 
        {
            layout: "main.hbs", 
            title:"Αστικές Συγκοινωνίες",
            news: someNews,
            allLines: results[1],
            styles: [
                {cssFile: "style.css"},
                {cssFile: "form_style.css"},
                {cssFile: "variables.css"}
            ],
            scripts: [
                //{jsFile: "news.js"},
                {jsFile: "newsHome.js"},
                {jsFile: "form_send_rec.js"}
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

            const tempAr = formatStops(results)[0].split("|");

            for (let i in results)
            {
                results[i].geografikiThesi = tempAr[i]
            }

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

exports.createMap = (req, res) => 
{
    model.getLineDetails("101", (err, results) => {
        const map = new Map({
            target: 'map',
            layers: [
              new TileLayer({
                source: new OSM()
              })
            ],
            view: new View({
              center: [0, 0],
              zoom: 0
            })
        });
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

//================================== POST =================================
/**
 * A function which finds the nearest bus stop.
 * 
 * It finds the nearest bus stop among all the bus stops of a specific line, based on the client's current position.
 * 
 * @param {Request} req A Request object, which contains the line's id.
 * @param {Response} res A Response object
 */
exports.findNearestStop = (req, res) => {

    model.getLineDetails(req.body.answer, (err, result) => {
        if (err) console.log(err);

        if (result.length != 0)
        {
            const formattedStops = formatStops(result);
            
            //FOR PRODUCTION
            /*
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?key=${API_KEY}&origins=${req.body.position}&mode=walking&destinations=${formattedStops[0]}&language=el&units=metric`)
            .then(res => res.json())
            .then(resul => {
                console.log(resul);
                resul.stopNames = formattedStops[1];
                    let minStop = {
                        duration: Infinity,
                        distance: "",
                        durationText: "",
                        minStopName: "",
                        coords: Infinity,
                        address: ""
                    }
                    for (let i in resul.rows)
                    {
                        if (minStop.duration > resul.rows[i].elements[0].duration.value) 
                        {
                            minStop.duration = resul.rows[i].elements[0].duration.value;
                            minStop.durationText = resul.rows[i].elements[0].duration.text;
                            minStop.distance = resul.rows[i].elements[0].distance.text;
                            minStop.minStopName = resul.stopNames[i];
                            minStop.address = resul.destination_addresses[i];
                            minStop.coords = formattedStops[0].split("|")[i];
                        }
                    }
                res.send(minStop);
            })
            //*/

            //FOR TESTING
            //*
            fetch("https://restcountries.eu/rest/v2/name/greece?fullText=true")
            .then(res => res.text())
            .then(resul => {
                
            
                example.stopNames =formattedStops[1];
    
                let minStop = {
                    duration: Infinity,
                    distance: "",
                    durationText: "",
                    minStopName: "",
                    coords: Infinity,
                    address: ""
                }
                for (let i in example.rows)
                {
                    if (minStop.duration > example.rows[i].elements[0].duration.value) 
                    {
                        minStop.duration = example.rows[i].elements[0].duration.value;
                        minStop.durationText = example.rows[i].elements[0].duration.text;
                        minStop.distance = example.rows[i].elements[0].distance.text;
                        minStop.minStopName = example.stopNames[i];
                        minStop.address = example.destination_addresses[i];
                        minStop.coords = formattedStops[0].split("|")[i];
                    }
                }
                res.send(minStop);
            })
            //*/
            // example.stopsNames = formattedStops[1]
            // res.send(example);
            // console.log(formattedStops);
        }

        
    })

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

/**
 * A functions that returns a String of coordinations and an Array of bus stops.
 * 
 * - It changes the coordinations format based on https://developers.google.com/maps/documentation/distance-matrix/overview?hl=en_GB#request-parameters, so they can be accepted\
 * by the API. 
 * - It, also, stores all the names of the bus stops in an Array
 * 
 * @access private
 * 
 * @param {Array.<JSON>} results 
 * @returns {Array.<String, Array.<String>>} The String with the formatted Coordinations and the Array with the names of the bus stops.
 */
function formatStops (results)
{
    let accum = "";
    let newAr = []
    for (let i in results)
    {
        let tempCoord = results[i].geografikiThesi.split(", ").join(",");
        accum += tempCoord;
        if (i != results.length-1) accum += "|";
        newAr.push(results[i].onomaStasis);
    }
    return [accum, newAr];
}
