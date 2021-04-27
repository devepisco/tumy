const registerUserTemplate = require('../../models/User');
const Exceptions = require('../../../errors/Exceptions');
const { structure } = require('../../middlewares/utils');
const { generateToken } = require("./helpers");
const crypto = require("crypto");

const resetPassword = structure (async (req, res, next) =>{

    //get user from the token 
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await registerUserTemplate.findOne({ passwordResetToken: hashedToken, 
        passwordResetExpires:{ $gt: Date.now() }})

    // if token has not expired, and ther is user, set the new password
    if(!user){
        return next(new Exceptions(400, "El token es inválido o ha expirado."));
    }
    user.password = req.body.password;
    //user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //update changed_password_at  property from the user

    //log the user in adn send JWT
    res.status(200).json({...generateToken(user._id), user })
});

module.exports = { resetPassword }