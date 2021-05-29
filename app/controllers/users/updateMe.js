const { User } = require("../../models/User");
const { structure, objSuccess } = require('../../middlewares/utils');
const { getUserIdFromToken  } = require("../auth/helpers/getUserIdFromToken");

const updateMe = structure(async (req, res) =>{
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        IDType:req.body.typeID,
        IDNumber:req.body.numID,
        business:req.body.business,
        phone:req.body.phone,
        email:req.body.email
    }
    const userId = getUserIdFromToken(req.headers.authorization.replace("Bearer ", "").trim())
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new:true});

    // const updatedUser = await findUserById(userId)

    res.status(200).json(
        objSuccess(updatedUser,"Se actualizaron los datos del usuario")
    );
});

module.exports = { updateMe }