const { matchedData } = require("express-validator");
const { User } = require("../../models/User");
const { structure } = require("../../middlewares/utils");
const { getUserIdFromToken  } = require("../auth/helpers/getUserIdFromToken");

const updateMe = structure(async (req, res) =>{
    const data = matchedData(req);
    
    let userId = getUserIdFromToken(req.headers.authorization.replace("Bearer ", "").trim())

    //console.log(userId);
    // Actualizar los campos recibidos
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true
    });
    
    
    res.status(200).json({
        updatedUser
    });
});

module.exports = { updateMe }