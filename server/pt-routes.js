'use strict';

//Require
const express = require('express');
const app = require("../app");
const ptController = require("./pt-controller");

const router = express.Router();

//Necessary for POST requests
router.use(express.urlencoded({extended: true}));
router.use(express.json());

//Home Page
router.get('/', ptController.homePage);
router.get('/index', ptController.homePage);
router.get('/index.html', ptController.htmlRedirection);

//News Page
router.get("/news", ptController.newsPage);
router.get("/news.html", ptController.htmlRedirection);

//Route Page
router.get("/route", ptController.routePage);
router.get("/route.html", ptController.htmlRedirection);

//Tickets Page
router.get("/tickets", ptController.ticketsPage);
router.get("/tickets.html", ptController.htmlRedirection);

//Contact Page
router.get("/contact", ptController.contactPage);
router.get("/contact.html", ptController.htmlRedirection);

//Page for specific route
router.get("/route/:routeID", ptController.specificRoutePage);

//It sends the data necessary for the map creation
router.get("/allStopsMap/:routeID", ptController.mapData);

//The "after sending the email" page
//router.get("/email", ptController.emailPage); //FOR DEVELOPMENT

//=================================================================
//It sends a GET request to Google API in order to find nearest bus stop
router.post("/nearest_stop", ptController.findNearestStop);

//It sends an email to a specific address
router.post("/email", ptController.sendEmail, ptController.emailPage);

module.exports = router;
