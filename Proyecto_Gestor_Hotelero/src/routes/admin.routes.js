'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require("../services/middleware");

api.post('/login', adminController.login);
api.post("/createAdmin", [middleware.isLoged, middleware.isAdmin], adminController.createAdmin);
api.post("/createHotel", [middleware.isLoged, middleware.isAdmin], adminController.createHotel);

module.exports = api;