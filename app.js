const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const path = require("path");

app.use("/css", express.static(__dirname+"/css"));
app.use("/scripts", express.static(__dirname+"/scripts"));
app.use("/media", express.static(__dirname+"/media"));
app.use("/modules", express.static(__dirname+"/node_modules"));


//Διαδρομές - Routes
const routes = require('./server/pt-routes');
app.use('/', routes);


//Χρήση των views - Using 'views'
//Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, αλλιώς δεν θα αναγνωριστεί το extname (αλλιώς τα αρχεία θα πρέπει να τελειώνουν με .handlebars)
//Note: engine name must be the same as extname (hbs) otherwise the handlebars template engine will look for files ending in '.handlebars'
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: __dirname+"/views/layouts",
    defaultLayout: "main"
}));

app.set('view engine', 'hbs');

app.set("views", __dirname + "/views")

const hbs = exphbs.create({});

//Helpers
hbs.handlebars.registerHelper("checkTicketType", function(varVal, fixedVal, options) {
    //console.log(arg1);
    return (fixedVal==varVal) ? options.fn(this) : options.inverse(this); 
}); 


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

let currentGroupLine = "0";
hbs.handlebars.registerHelper("groupLinesSelect", function (lineID, options) {
    if (currentGroupLine != lineID.toString()[0])
    {
        currentGroupLine = lineID.toString()[0]
        return `<option value="" disabled> -- Γραμμές Νο. ${currentGroupLine} -- </option>`
    }
})

hbs.handlebars.registerHelper("groupLinesRoute", function (lineID, options) {
    if (currentGroupLine != lineID.toString()[0])
    {
        currentGroupLine = lineID.toString()[0]

        if (currentGroupLine == "1") return `<li><strong>Γραμμές Νο. ${currentGroupLine}</strong></li><hr class="solid">`
        
        return `<br><li><strong>Γραμμές Νο. ${currentGroupLine}</strong></li><hr class="solid">`
        
    }
})


hbs.handlebars.registerHelper("restoreGroupLineVal", function(options) {
    currentGroupLine = 0;
})


module.exports = app;
