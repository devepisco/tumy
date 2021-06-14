const { User } = require("../../models/User");
const { structure, objSuccess } = require('../../middlewares/utils');
const { matchedData } = require("express-validator");

const updateUsers = structure(async (req, res) =>{
    const userData = matchedData(req)
    const userId = req.params.id 
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {new:true});
    res.status(200).json(
        objSuccess(updatedUser,"Se actualizaron los datos del usuario")
    );
});

module.exports = { updateUsers }