const Exceptions = require('../../../errors/Exceptions');
const { User, Empresa } = require('../../models/User');
const { structure, objSuccess } = require('../../middlewares/utils');
const mongoose = require('mongoose');

const registerUser = structure(async (req , res)=> {
    const foundUser = await User.findOne({email: req.body.email})
    if(foundUser) throw new Exceptions(400, "El correo ya fue registrado")

    const foundIdUser = await User.findOne({IDNumber: req.body.numID})
    if(foundIdUser) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        IDType:req.body.typeID,
        IDNumber:req.body.numID,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password       
    })
    if(req.body.isOrg == "true"){
        const registeredOrg = new Empresa({
            _id: new mongoose.Types.ObjectId(),
            nombre: req.body.nombreEmpresa,
            razonSocial: req.body.razonSocial,
            ruc: req.body.ruc
        })
        if(registeredUser && registeredOrg){
            await registeredUser.save()
            await registeredOrg.save()
            dataFromOrg = { business: registeredOrg._id }
            await User.findByIdAndUpdate(registeredUser._id, dataFromOrg) 
        }
    }
    await registeredUser.save()
    return res.status(200).json(objSuccess(
        data={},
        message = "Usuario registrado correctamente"
    ));
});

module.exports = { registerUser }