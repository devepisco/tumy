const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { getItemsWithPagination } = require("../../../app/middlewares/db");
const { User } = require("../../models/User");
const { isAdmin } = require("../admin/helpers");

const getAllUsers = structure(async (req, res) => {
  const isUserAdmin = await isAdmin(req.user._id);
  if (!isUserAdmin) return handleError(res, 400, "Usuario no permitido.");
  const users = await getItemsWithPagination(
    req.query,
    { isBlocked: req.query.isBlocked,
      //role: req.params.typeUser
    },
    User
  );
  return res.status(200).json(objSuccess(users));
});
module.exports = { getAllUsers };
