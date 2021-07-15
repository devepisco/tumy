const { matchedData } = require("express-validator");
const { User } = require("../../models/User");
const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");

const updateProfilePicture = structure(async (req, res) => {   
  const data = matchedData(req);
  console.log(data)
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      profilePicture:req.files.profilePicture[0].filename
    },
    { new: true }
  );
  
  return res
    .status(200)
    .json(objSuccess(user, "Foto de perfil actualizada correctamente"));
});

module.exports = { updateProfilePicture };
