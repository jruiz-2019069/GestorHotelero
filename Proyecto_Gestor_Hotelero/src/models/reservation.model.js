'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    startDate: Date,
    finishDate: Date,
    price: Number,
    idClient: {type: mongoose.Schema.ObjectId, ref:'Client'},
    idHotel: {type: mongoose.Schema.ObjectId, ref:'Hotel'},
    rooms: [{room:{
        idRoom: {type: mongoose.Schema.ObjectId, ref: 'Room'},
        services: [{service:{
            idHotelService: {type: mongoose.Schema.ObjectId, ref: 'HotelService'}
        }}],
        subTotal: Number
    }}],
    total: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);