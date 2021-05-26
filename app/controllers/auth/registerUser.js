const Exceptions = require('../../../errors/Exceptions');
const { User } = require('../../models/User');
const { findUserByEmail } = require('../users/helpers')
const { structure, objSuccess } = require('../../middlewares/utils');

const registerUser = structure(async (req , res)=> {
    const foundUser = await findUserByEmail(req.body.email);
    if(foundUser) throw new Exceptions(400, "El correo ya fue registrado")

    const foundIDUser = await User.findOne({IDNumber: req.body.numID})
    if(foundIDUser) throw new Exceptions(400, "El DNI ya fue registrado")

    const registeredUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        IDType:req.body.typeID,
        IDNumber:req.body.numID,
        business:req.body.business, 
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password       
    })
    await registeredUser.save()
    return res.status(200).json(
        objSuccess({}, message = "Usuario registrado correctamente")
        );
});

module.exports = { registerUser }