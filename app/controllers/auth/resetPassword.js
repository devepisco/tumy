const registerUserTemplate = require('../../models/User');
const Exceptions = require('../../../errors/Exceptions');
const { structure } = require('../../middlewares/utils');
const { generateToken } = require("./helpers");
const crypto = require("crypto");

const resetPassword = structure (async (req, res) =>{

    //get user from the token 
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await registerUserTemplate.findOne({ passwordResetToken: hashedToken, 
        passwordResetExpires:{ $gt: Date.now() }})

    // if token has not expired, and ther is user, set the new password
    if(!user){
        throw new Exceptions(404, "El token es inválido o ha expirado.");
    }
    user.password = req.body.password;
    //user.passwordConfirm = req.body.passwordConfirm;
    //update changed_password_at  property from the user
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //send status success
    res.status(200).json({ status: 'success' })
});

module.exports = { resetPassword }