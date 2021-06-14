const { User } = require("../../models/User");
const { structure, objSuccess } = require('../../middlewares/utils');
const { matchedData } = require("express-validator");

const updateUser = structure(async (req, res) =>{

    const userData = matchedData(req)
    const userId = req.user._id 
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new:true});
    // const updatedUser = await findUserById(userId)
    res.status(200).json(
        objSuccess(updatedUser,"Se actualizaron los datos del usuario")
    );
});

module.exports = { updateUser }