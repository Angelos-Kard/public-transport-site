'use strict';

const express = require('express');
const router = express.Router();

const ptController = require("./pt-controller");

router.get('/', ptController.homePage);

router.get('/index', ptController.homePage);

module.exports = router;