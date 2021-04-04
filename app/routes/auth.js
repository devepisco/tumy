const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const {
  login,
  getProfile,
  refreshToken,
} = require('../controllers/auth')

const {
  validateLogin
} = require('../controllers/auth/validators')

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

/*
 * Profile route
 */
router.get(
  '/profile', 
  requireAuth,
  trimRequest.all, 
  getProfile
)

/*
 * Refresh token route
 */
router.get(
  '/refresh_token', 
  requireAuth,
  trimRequest.all, 
  refreshToken
)

module.exports = router
