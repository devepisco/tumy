const Exceptions = require('../../../errors/Exceptions');
const registerUserTemplate = require('../../models/User');
const { structure, objSuccess } = require('../../middlewares/utils');

const registerUser = structure(async (req , res)=> {
    const findedUser = await registerUserTemplate.findOne({email: req.body.email})
    if(findedUser) throw new Exceptions(400, "El correo ya fue registrado")

    const findedUser2 = await registerUserTemplate.findOne({numID: req.body.numID})
    if(findedUser2) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredUser = new registerUserTemplate({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        typeID:req.body.typeID,
        numID:req.body.numID,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password       
    })
    await registeredUser.save()
    return res.status(200).json(objSuccess(
        data={},
        message = "Usuario registrado correctamente"
    ))
});

module.exports = { registerUser }