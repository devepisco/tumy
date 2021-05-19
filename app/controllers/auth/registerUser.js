const Exceptions = require('../../../errors/Exceptions');
const registerUserTemplate = require('../../models/User');
const { structure, objSuccess } = require('../../middlewares/utils');
const mongoose = require('mongoose');

const registerUser = structure(async (req , res)=> {
    const findedUser = await registerUserTemplate.User.findOne({email: req.body.email})
    if(findedUser) throw new Exceptions(400, "El correo ya fue registrado")

    const findedUser2 = await registerUserTemplate.User.findOne({numID: req.body.numID})
    if(findedUser2) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredUser = new registerUserTemplate.User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        typeID:req.body.typeID,
        numID:req.body.numID,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password       
    })
    if(req.body.isOrg == "true"){
        const registeredOrg = new registerUserTemplate.Empresa({
            _id: new mongoose.Types.ObjectId(),
            nombre: req.body.nombreEmpresa,
            razonSocial: req.body.razonSocial,
            ruc: req.body.ruc
        })
        if(registeredUser && registeredOrg){
            await registeredUser.save()
            await registeredOrg.save()
            dataFromOrg = { empresa: registeredOrg._id }
            await registerUserTemplate.User.findByIdAndUpdate(registeredUser._id, dataFromOrg) 
        }
    }
    await registeredUser.save()
    return res.status(200).json(objSuccess(
        data={},
        message = "Usuario registrado correctamente"
    ));
});

module.exports = { registerUser }