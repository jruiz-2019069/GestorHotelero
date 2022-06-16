'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');
const middleware = require("../services/middleware");

api.post('/login', adminController.login);
api.post("/createAdmin", [middleware.isLoged, middleware.isAdmin], adminController.createAdmin);
api.post("/createHotel", [middleware.isLoged, middleware.isAdmin], adminController.createHotel);
api.get("/getHotels", [middleware.isLoged, middleware.isAdmin], adminController.getHotels);
api.get("/getManagersAndClients", [middleware.isLoged, middleware.isAdmin], adminController.getManagersAndClients);


module.exports = api;