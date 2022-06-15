'use strict'

const Admin = require('../models/admin.model');
const Manager = require('../models/manager.model');
const Client = require('../models/client.model');
const jwt = require('../services/jwt');
const {dataObligatory, dencryptPassword} = require('../utils/validate');

exports.login = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            username: params.username,
            password: params.password
        }

        const msg = await dataObligatory(data);

        if(msg){
            return res.status(400).send(msg);
        }else{
            let admin = await Admin.findOne({username: params.username});
            let manager = await Manager.findOne({username: params.username});
            let client = await Client.findOne({username: params.username}); 
            if(admin && await dencryptPassword(params.password, admin.password)){
                const token = await jwt.createToken(admin);
                return res.status(200).send({token, client, message: 'Entering the system...'});
            }else if(manager && await dencryptPassword(params.password, manager.password)){
                const token = await jwt.createToken(manager);
                return res.status(200).send({token, client, message: 'Entering the system...'});
            }else if(client && await dencryptPassword(params.password, client.password)){
                const token = await jwt.createToken(client);
                return res.status(200).send({token, client, message: 'Entering the system...'});
            }else{
                return res.status(403).send({message: 'Incorrect username or password.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}