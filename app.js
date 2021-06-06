const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const path = require("path");

//Creating Static Files
app.use("/css", express.static(__dirname+"/css"));
app.use("/scripts", express.static(__dirname+"/scripts"));
app.use("/media", express.static(__dirname+"/media"));
app.use("/modules", express.static(__dirname+"/node_modules"));


//Διαδρομές - Routes
const routes = require('./server/pt-routes');
app.use('/', routes);

//Handlebars Engine and folders path
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: __dirname+"/views/layouts",
    defaultLayout: "main"
}));

app.set('view engine', 'hbs');

app.set("views", __dirname + "/views")

const hbs = exphbs.create({});

//Custom Helpers
//It checks if a ticket is "meiomeno", "kanoniko", "epivarimeno"
//Generally, it checks if two values are equal
hbs.handlebars.registerHelper("checkTicketType", function(varVal, fixedVal, options) {
    return (fixedVal==varVal) ? options.fn(this) : options.inverse(this); 
}); 

//It checks if a route has stops in zone A or zone B or Both
hbs.handlebars.registerHelper("checkZone", function(allStops, options) {
    let flagA = false;
    let flagB = false;
    for (let i in allStops)
    {
        if (allStops[i].zoni == "A") flagA = true;
        else if(allStops[i].zoni == "B") flagB = true;
    }

    if (flagA && flagB) return "Α και Ζώνη Β";
    else if (flagA) return "Α";
    else return "Β";
})


let currentGroupLine = "0"; //Usefull for the next 2 helpers

//It groups the lines based of the first digit of their id
hbs.handlebars.registerHelper("groupLinesSelect", function (lineID, options) {
    if (currentGroupLine != lineID.toString()[0])
    {
        currentGroupLine = lineID.toString()[0]
        return `<option value="" disabled> -- Γραμμές Νο. ${currentGroupLine} -- </option>`
    }
})

//It groups the lines based of the first digit of their id
hbs.handlebars.registerHelper("groupLinesRoute", function (lineID, options) {
    if (currentGroupLine != lineID.toString()[0])
    {
        currentGroupLine = lineID.toString()[0]

        if (currentGroupLine == "1") return `<li><strong>Γραμμές Νο. ${currentGroupLine}</strong></li><hr class="solid">`
        
        return `<br><li><strong>Γραμμές Νο. ${currentGroupLine}</strong></li><hr class="solid">`
        
    }
})

//It restores the currentGroupLine var back to its original value
hbs.handlebars.registerHelper("restoreGroupLineVal", function(options) {
    currentGroupLine = 0;
})


module.exports = app;
