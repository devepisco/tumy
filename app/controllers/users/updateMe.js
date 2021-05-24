const { User, Business } = require("../../models/User");
const { structure } = require("../../middlewares/utils");
const { getUserIdFromToken  } = require("../auth/helpers/getUserIdFromToken");

const updateMe = structure(async (req, res) =>{
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        IDType:req.body.typeID,
        IDNumber:req.body.numID,
        phone:req.body.phone,
        email:req.body.email
    }

    const orgData = {
        name: req.body.nombreEmpresa,
        socialReason: req.body.razonSocial,
        ruc: req.body.ruc
    }
    const userId = getUserIdFromToken(req.headers.authorization.replace("Bearer ", "").trim())
    const foundNewUser = await User.findByIdAndUpdate(userId, userData, {new:true});

    if(foundNewUser.business) {
        await Business.findByIdAndUpdate(foundNewUser.business, orgData)
    }

    const updatedUser = await User.findOne({_id:userId}).populate("business",{__v:0})

    res.status(200).json({
        updatedUser
    });
});

module.exports = { updateMe }