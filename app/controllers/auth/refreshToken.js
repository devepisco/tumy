const {
  getUserIdFromToken,
  getNavigationByRole,
  generateToken,
} = require("./helpers"),
 { findUserById } = require("../users/helpers"),
 { isIDGood, structure } = require("../../middlewares/utils");

const refreshToken = structure(async (req, res) => {
  const tokenEncrypted = req.headers.authorization
    .replace("Bearer ", "")
    .trim();
  let userId = getUserIdFromToken(tokenEncrypted);
  userId = isIDGood(userId);
  const user = await findUserById(userId);
  user.navigation = getNavigationByRole(user.role?.name);
  res.status(200).json({ ...generateToken(userId), user });
});

module.exports = { refreshToken };
