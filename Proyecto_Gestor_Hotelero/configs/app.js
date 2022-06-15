'use strict'

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRoutes = require('../src/routes/client.routes');
const adminRoutes = require('../src/routes/admin.routes');

//Creación del servidor

const app = express();

//Configuraciones del servidor de express

app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Configuraciones de las rutas

app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);

module.exports = app;