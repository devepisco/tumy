const { User } = require("../../models/User");
const { structure, objSuccess } = require('../../middlewares/utils');
const { getUserIdFromToken  } = require("../auth/helpers/getUserIdFromToken");
const { matchedData } = require("express-validator");

const updateMe = structure(async (req, res) =>{

    const userData = matchedData(req)
    const userId = req.user._id
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new:true});
    // const updatedUser = await findUserById(userId)
    res.status(200).json(
        objSuccess(updatedUser,"Se actualizaron los datos del usuario")
    );
});

module.exports = { updateMe }