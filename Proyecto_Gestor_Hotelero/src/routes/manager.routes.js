"use strict"

const managerController = require("../controllers/manager.controller");
const middleware = require("../services/middleware");
const express = require('express');
const api = express.Router();

api.post("/createRoom/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createRoom);
api.get("/getRooms/:idHotel", [middleware.isLoged, middleware.isManager], managerController.getRooms);
api.get("/getAvaibleRooms/:idHotel", [middleware.isLoged, middleware.isManager], managerController.getAvaibleRooms);
api.post("/createEvent/:idHotel", [middleware.isLoged, middleware.isManager], managerController.createEvent);

module.exports = api;