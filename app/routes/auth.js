const express = require("express");
const router = express.Router();
require("../../config/passport");
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
  login,
  registerUser,
  registerDriver,
  getProfile,
  refreshToken,
  forgotPassword,
  resetPassword,
  validateToken
} = require("../controllers/auth");

const {
  validateLogin,
  validateRegisterUser,
  validateRegisterDriver,
} = require("../controllers/auth/validators");

const { upload } = require("../../config/multer")

/** 
 * Validate Token from User
 */
router.get("/validate_token", trimRequest.all, validateToken);
  
/*
 * Register User route
 */
router.post("/register/user", trimRequest.all, validateRegisterUser, registerUser);

/*
 * Register Driver route
 */
router.post("/register/driver", trimRequest.all, upload.single("profilePicture"), validateRegisterDriver, registerDriver);

/*
 * Login route
 */
router.post("/login", trimRequest.all, validateLogin, login);

/*
 * Profile route
 */
router.get("/profile", requireAuth, trimRequest.all, getProfile);

/*
 * Refresh token route
 */
router.get("/refresh_token", requireAuth, trimRequest.all, refreshToken);

/**
 * Forgot Password route
 */
router.post("/forgot_password", forgotPassword);

/**
 * Reset Password rout
 */
router.patch("/reset_password/:token", resetPassword);

module.exports = router;
