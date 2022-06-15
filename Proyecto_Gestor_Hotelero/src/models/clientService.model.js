'use strict'

const mongoose = require('mongoose');

const clientServiceSchema = mongoose.Schema({
    idHotelService: {type: mongoose.Schema.ObjectId, ref: 'HotelService'},
    idClient: {type: mongoose.Schema.ObjectId, ref: 'Client'}
});

module.exports = mongoose.model('ClientService', clientServiceSchema);