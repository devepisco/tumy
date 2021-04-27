const Exceptions = require('../../../errors/Exceptions');
const registerDriverTemplate = require('../../models/Driver');
const { structure } = require('../../middlewares/utils');

const registerDriver = structure(async (req , res)=> {
    const findedUser = await registerDriverTemplate.findOne({email: req.body.email})
    if(findedUser) throw new Exceptions(400, "El correo ya fue registrado")

    const findedUser2 = await registerDriverTemplate.findOne({numID: req.body.numID})
    if(findedUser2) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredDriver = new registerDriverTemplate({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        typeID:req.body.typeID,
        numID:req.body.numID,
        numSOAT:req.body.numSOAT,
        numPlaca:req.body.numPlaca,
        numTarjetaPropiedad:req.body.numTarjetaPropiedad,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.file.filename,
    })
    const data = await registeredDriver.save()
    return res.json(data)
});

module.exports = { registerDriver }