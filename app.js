const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const path = require("path");

app.use(express.static("/server/public"));

//Διαδρομές - Routse
const routes = require('./server/pt-routes');
app.use('/', routes);


//Χρήση των views - Using 'views'
//Σημ.: η engine πρέπει να έχει ίδιο όνομα με το extname, αλλιώς δεν θα αναγνωριστεί το extname (αλλιώς τα αρχεία θα πρέπει να τελειώνουν με .handlebars)
//Note: engine name must be the same as extname (hbs) otherwise the handlebars template engine will look for files ending in '.handlebars'
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: __dirname+"/server/views/layouts",
    defaultLayout: "main",
}));

app.set('view engine', 'hbs');

app.set("views", __dirname + "/server/views")

module.exports = app;