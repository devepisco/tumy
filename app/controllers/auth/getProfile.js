const {
  getUserIdFromToken,
  getNavigationByRole,
} = require("./helpers");
const { findUserById } = require('../users/helpers')
const { isIDGood, structure } = require("../../middlewares/utils");

const getProfile = structure(async (req, res) => {
  const tokenEncrypted = req.headers.authorization
    .replace("Bearer ", "")
    .trim();
  let userId = getUserIdFromToken(tokenEncrypted)
  userId = isIDGood(userId);
  const user = await findUserById(userId);
  user.navigation = getNavigationByRole(user.role);
  res.status(200).json({ user });
});

module.exports = { getProfile };
