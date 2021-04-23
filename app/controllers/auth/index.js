const { login } = require('./login')
const { registerUser } = require('./registerUser')
const { registerDriver } = require('./registerDriver')
const { getProfile } = require('./getProfile')
const { refreshToken } = require('./refreshToken')

module.exports = {
    login,
    registerUser,
    registerDriver,
    getProfile,
    refreshToken
}