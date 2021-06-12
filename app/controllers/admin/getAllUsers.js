const {
  structure,
  isIDGood,
  handleError,
} = require("../../../app/middlewares/utils");
const { getItemsWithPagination} = require("../../../app/middlewares/db")
const { User } = require("../../models/User")
const { isAdmin } = require("./helpers/isAdmin");

const getAllUsers = structure(async (req, res) => {
  if (!isIDGood(req.user.id))
    return handleError(res, 404, "Formato incorrecto del Id de usuario.");
  if (!isAdmin(req.user.id))
    return handleError(res, 400, "Usuario no permitido.");
  //get All users
  const users = await getItemsWithPagination(req.query,{}, User);
  return res.status(200).json(objSucces(drivers));
});
module.exports = { getAllUsers };
