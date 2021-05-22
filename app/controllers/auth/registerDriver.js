const Exceptions = require('../../../errors/Exceptions');
const { Driver } = require('../../models/Driver');
const { structure, objSuccess } = require('../../middlewares/utils');

const registerDriver = structure(async (req , res)=> {
    const findedUser = await Driver.findOne({email: req.body.email})
    if(findedUser) throw new Exceptions(400, "El correo ya fue registrado")

    const findedUser2 = await Driver.findOne({IDNumber: req.body.numID})
    if(findedUser2) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredDriver = new Driver({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        IDType:req.body.typeID,
        IDNumber:req.body.numID,
        SOATNumber:req.body.numSOAT,
        VehicleRegistration:req.body.numPlaca,
        propertyCardNumber:req.body.numTarjetaPropiedad,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.file.filename,
    })

    await registeredDriver.save()

    return res.status(200).json(objSuccess(
        data ={},
        message = "Usuario motorizado registrado correctamente"
    ))
});

module.exports = { registerDriver }