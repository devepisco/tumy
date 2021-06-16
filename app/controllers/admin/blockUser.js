const { structure, objSuccess, handleError } = require("../../middlewares/utils");
const { User } = require("../../models/User");
const { matchedData } = require("express-validator");

const blockUser = structure(async (req, res) => {
  const { id, action } = matchedData(req);
  const user = await User.findOne({ _id: id });
  if(!user) return handleError(res, 400, "Usuario no encontrado");
  let message ="";
  switch(action){
    case 'block':
      user.isBlocked = true;
      message = "usuario bloqueado correctamente";
      break;
    case 'unblock':
      user.isBlocked = false;
      message = "usuario activado correctamente";
      break;
    default:
      break;
  }
  await user.save();
  res.status(200).json(objSuccess(user,message));
});
module.exports = { blockUser };
