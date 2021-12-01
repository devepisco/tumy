const { User } = require("../../models/User");
const Exceptions = require("../../../errors/Exceptions");
const {
  structure,
  objSuccess,
  handleError,
} = require("../../middlewares/utils");
const { checkPassword } = require("../../middlewares/auth");

const resetPassword = structure(async (req, res) => {
  //get user from the email
  const user = await User.findOne({
    email: req.body.email,
    passwordResetExpires: { $gte: Date.now() },
  });
  // if token has not expired, and ther is user, set the new password
  if (!user) {
    throw new Exceptions(404, "El token es inválido o ha expirado.");
  }
  const isTokenMatch = await checkPassword(
    req.params.token,
    user.passwordResetToken
  );
  if (!isTokenMatch)
    return handleError(res, 409, "Token de recuperación incorrecto");

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //send status success
  res
    .status(200)
    .json(objSuccess({}, "La contraseña se ha actualizado correctamente"));
});

module.exports = { resetPassword };
