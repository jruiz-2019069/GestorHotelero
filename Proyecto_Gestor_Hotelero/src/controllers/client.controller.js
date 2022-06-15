'use strict'

const Client = require('../models/client.model');
const {dataObligatory, encryptPassword} = require('../utils/validate');

exports.testClientController = (req, res)=>{
    return res.send({message: 'The function test client controller is running.'});
}

//Función para que un cliente se pueda registrar dentro de la aplicación.
exports.register = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            lastname: params.lastname,
            email: params.email, 
            phone: params.phone,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }

        const msg = await dataObligatory(data);
        
        if(msg){
            return res.status(400).send(msg);
        }else{
            const usernameFound = await Client.findOne({username: params.username});
            if(usernameFound){
                return res.send({message: 'This username already exist.'});
            }else{
                data.password = await encryptPassword(params.password);
                let client = new Client(data);
                await client.save();
                return res.status(200).send({message: 'Client created succesfullly.'});
            }
        }
    }catch(err){
        console.log(err);
        return err;
    }
}
