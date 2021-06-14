const { validateUpdatedUser } = require('./validateUpdatedUser')
const { validateCoordinates } = require('./validateCoordinates')
const { validateDetailsfromService } = require('./validateDetailsfromService')
const {validateTypeUser} = require('./validateTypeUser')

module.exports = {
    validateUpdatedUser,
    validateCoordinates,
    validateDetailsfromService,
    validateTypeUser
}