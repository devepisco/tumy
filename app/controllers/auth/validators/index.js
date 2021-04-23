const { validateLogin } = require('./validateLogin')
const { validateRegisterUser } = require('./validateRegisterUser')
const { validateRegisterDriver } = require('./validateRegisterDriver')

module.exports = {
    validateLogin,
    validateRegisterUser,
    validateRegisterDriver
}