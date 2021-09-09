const { login } = require('./login')
const { registerUser } = require('./registerUser')
const { registerDriver } = require('./registerDriver')
const { getProfile } = require('./getProfile')
const { refreshToken } = require('./refreshToken')
const { forgotPassword } = require('./forgotPassword')
const { resetPassword } = require('./resetPassword')
const { validateToken } = require('./validateToken')

module.exports = {
    login,
    registerUser,
    registerDriver,
    getProfile,
    refreshToken,
    forgotPassword,
    resetPassword,
    validateToken
}