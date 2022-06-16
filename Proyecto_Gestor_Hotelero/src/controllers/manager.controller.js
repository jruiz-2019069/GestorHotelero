'use strict'
const {dataObligatory} = require("../utils/validate");
const Room = require("../models/room.model");
const Event = require("../models/event.model");

//FUNCIÓN PARA CREAR UNA HABITACIÓN ASIGNADA A UN HOTEL.
exports.createRoom = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const params = req.body;
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            price: params.price,
            status: true,
            idHotel: idHotel
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send({msg});
        }else{
            const nameRoom = await Room.findOne({name: data.name, idHotel: idHotel});
            if(nameRoom){
                return res.status(400).send({message: "The name room already exist."});
            }else{
                let room = new Room(data);
                await room.save();
                return res.status(200).send({message: "Room created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA OBTENER TODAS LAS HABITACIONS DE UN HOTEL
exports.getRooms = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const roomsHotel = await Room.find({idHotel: idHotel});
        if(roomsHotel){
            return res.status(200).send({roomsHotel});
        }else{
            return res.status(400).send({message: "There is not rooms to show."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA OBTENER LAS HABITACIONES DISPONIBLES DE UN HOTEL
exports.getAvaibleRooms = async (req, res) => {
    try {
        const idHotel = req.params.idHotel;
        const avaibleRooms = await Room.find({idHotel: idHotel, status: true});
        if(avaibleRooms){
            return res.status(200).send({avaibleRooms});
        }else{
            return res.status(400).send({message: "There is not avaible rooms."});
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

//FUNCIÓN PARA CREAR UN EVENTO A UN HOTEL
exports.createEvent = async (req, res) => {
    try {
        const params = req.body;
        const idHotel = req.params.idHotel;
        const data = {
            name: params.name.toUpperCase(),
            type: params.type,
            description: params.description,
            idHotel: idHotel
        }
        const msg = await dataObligatory(data);
        if(msg){
            return res.status(400).send({msg});
        }else{
            const nameEvent = await Event.findOne({name: data.name, idHotel: idHotel});
            if(nameEvent){
                return res.status(400).send({message: "The name of event already exist."});
            }else{
                let event = new Event(data);
                await event.save();
                return res.status(200).send({message: "Event created succesfully."});
            }
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}