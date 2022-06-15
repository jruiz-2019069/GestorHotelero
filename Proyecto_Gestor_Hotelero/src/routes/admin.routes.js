'use strict'

const express = require('express');
const api = express.Router();
const adminController = require('../controllers/admin.controller');

api.post('/login', adminController.login);

module.exports = api;