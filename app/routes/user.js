const express = require("express");
const router = express.Router();
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
    updateMe,
    getPrice
  } = require("../controllers/users");

  const {
    validateUpdatedUser,
    validateSearchPrice
  } = require("../controllers/users/validators");

/**
 * Updating user data route
 */
router.patch("/updateMe", requireAuth, trimRequest.all, validateUpdatedUser, updateMe);

/**
 * getting the price for the ride route
 */
 router.get("/getPrice", trimRequest.all,validateSearchPrice, getPrice);



module.exports = router;