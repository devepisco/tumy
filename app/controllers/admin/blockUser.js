const { structure, objSuccess } = require("../../middlewares/utils");
const { User } = require("../../models/User");
const { matchedData } = require("express-validator");

const blockUser = structure(async (req, res) => {
  const { id } = matchedData(req);
  const user = await User.findOne({ _id: id });
  user.isBlocked = !user.isBlocked;
  await user.save();
  if(user.isBlocked) message = "usuario bloqueado correctamente";
  else message = "usuario activado correctamente";
  res.status(200).json(objSuccess(user,message));
});
module.exports = { blockUser };
