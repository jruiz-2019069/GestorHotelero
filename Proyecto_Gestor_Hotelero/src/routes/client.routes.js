'use strict'

const express = require('express');
const api = express.Router();
const clientController = require('../controllers/client.controller');

api.get('/testClientController', clientController.testClientController);
api.post('/register', clientController.register);

module.exports = api;

