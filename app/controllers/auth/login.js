const { matchedData } = require("express-validator"),
  { structure, handleError, objSuccess } = require("../../middlewares/utils"),
  { checkPassword } = require("../../middlewares/auth"),
  { userIsBlocked, generateToken, getNavigationByRole } = require("./helpers"),
  { findUserByEmail } = require("../users/helpers");

const login = structure(async (req, res) => {
  const data = matchedData(req);
  const user = await findUserByEmail(data.email);
  if (!user) return handleError(res, 404, "El usuario no esta registrado");
  if (userIsBlocked(user))
    return handleError(res, 409, "El usuario ha sido bloqueado");
  const isPasswordMatch = await checkPassword(data.password, user.password);
  if (!isPasswordMatch) return handleError(res, 409, "Contraseña incorrecta");
  else {
    // all ok, register access and return token
    delete user.password;
    user.navigation = getNavigationByRole(user.role?.name);
    return res.status(200).json(objSuccess(
      { ...generateToken(user._id), user },
      message = "Usuario logueado correctamente."
      ));
  }
});

module.exports = { login };
