const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const trimRequest = require('trim-request')
const requireAuth = passport.authenticate('jwt', {
  session: false
})

const multer = require('multer')

const {
  login,
  registerUser,
  registerDriver,
  getProfile,
  refreshToken, 
} = require('../controllers/auth')

const {
  validateLogin,
  validateRegisterUser,
  validateRegisterDriver
} = require('../controllers/auth/validators')


//define storage for images
const storage = multer.diskStorage({
//destination for files
  destination:function (request, file, callback){
    callback(null, 'public/uploads/images');
  },
//add back the extension
  filename:function(request, file, callback){
    const date = new Date().toDateString().split(" ").join("_");
    callback(null, date + file.originalname);
    },
});

//Upload parameters for multer
const upload = multer ({
  storage:storage,
  limits:{
    fieldsize: 1024 * 1024 * 3,
  }
});

/*
 * Register User route
 */
router.post('/register/user', validateRegisterUser, registerUser)

/*
 * Register Driver route
 */
router.post('/register/driver', upload.single('profilePicture'), registerDriver)


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
