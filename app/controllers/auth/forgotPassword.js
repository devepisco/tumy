const Exceptions = require("../../../errors/Exceptions");
const { User } = require("../../models/User");
const { structure, sendEmail, objSuccess } = require("../../middlewares/utils");
const crypto = require("crypto");

const forgotPassword = structure(async (req, res, next) => {
  //get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new Exceptions(404, "No existe un usuario con ese correo");
  }
  //generate the random reset token
  user.passwordResetToken = crypto.randomInt(1000, 9999);
  const resetToken = user.passwordResetToken;
  user.createPasswordResetToken();
  const message =
    `¿Olvidaste tu contraseña?\n` +
    `Ingresa este código de 4 dígitos para continuar con la recuperación de tu contraseña:\n` +
    `<  ` +
    resetToken +
    ` >\n` +
    `Si no olvidaste tu contraseña, por favor olvida este mensaje.`;
  const subject = resetToken + `: El token de cambio de tu contraseña es válido por 30 minutos.`;
  try {
    await sendEmail({
      email: user.email,
      subject,
      message,
    });

    res.status(200).json(objSuccess({}, "Token enviado al correo"));
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(
      new Exceptions(
        500,
        "Hubo un error al enviar el correo de recuperacion de contraseña. Inténtalo nuevamente."
      )
    );
  }
});

module.exports = { forgotPassword };
