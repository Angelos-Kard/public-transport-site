'use strict';

const express = require('express');
const app = require("../app");
//const { route } = require('../app');
const router = express.Router();

const ptController = require("./pt-controller");

router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/', ptController.homePage);

router.get('/index', ptController.homePage);
router.get('/index.html', ptController.htmlRedirection);

router.get("/news", ptController.newsPage);
router.get("/news.html", ptController.htmlRedirection);

router.get("/route", ptController.routePage);
router.get("/route.html", ptController.htmlRedirection);

router.get("/tickets", ptController.ticketsPage);
router.get("/tickets.html", ptController.htmlRedirection);

router.get("/contact", ptController.contactPage);
router.get("/contact.html", ptController.htmlRedirection);

router.get("/route/:routeID", ptController.specificRoutePage);

//router.get("/createMap", ptController.createMap);

router.get("/allStopsMap/:routeID", ptController.mapData)

//=================================================================

router.post("/nearest_stop", ptController.findNearestStop);
module.exports = router;