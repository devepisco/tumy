const Exceptions = require('../../../errors/Exceptions');
const { User } = require('../../models/User');
const { structure, sendEmail } = require('../../middlewares/utils');


const forgotPassword = structure(async (req, res, next) => {
    //get user based on posted email
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        throw new Exceptions(404, 'No existe un usuario con ese correo');
    }
    //generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    //send it to the user's mail
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset_password/${resetToken}`;

    const message = `¿Olvidaste tu contraseña? Envia una solicitud PATCH con tu nueva contraseña 
    al: ${resetURL}.\nSi no olvidaste tu contraseña, por favor olvida este mensaje.`;
    try{
        await sendEmail({
            email: user.email,
            subject: 'El token de cambio de tu contraseña es válido por 10 minutos.',
            message
        });
    
        res.status(200).json({
            success: true,
            message: 'Token enviado al correo.'
        });
    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return next(new Exceptions(500, 'Hubo un error al enviar el correo de recuperacion de contraseña. Inténtalo nuevamente.'));
    }
    
});

module.exports = { forgotPassword } 