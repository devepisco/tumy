const jwt = require('jsonwebtoken')
const { decrypt } = require('../../../middlewares/crypto')

const getUserIdFromToken = (token = '') => {
    // Decrypts, verifies and decode token
    const payload = jwt.verify(decrypt(token), process.env.JWT_SECRET)
    return payload.data._id
}

module.exports = { getUserIdFromToken }
