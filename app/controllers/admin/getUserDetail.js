const { structure, objSuccess } = require("../../middlewares/utils");
const { findUserById } = require("../../controllers/users/helpers");
const { isAdmin } = require("../admin/helpers");

const getUserDetail = structure(async (req, res) => {
  const isUserAdmin = await isAdmin(req.user.id);
  if (!isUserAdmin) return handleError(res, 400, "Usuario no permitido.");
  const user = findUserById(req.params.id);
  res.status(200).json(objSuccess(user));
});

module.exports = { getUserDetail };
