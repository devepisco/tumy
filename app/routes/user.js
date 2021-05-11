const express = require("express");
const router = express.Router();
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
    updateMe,
    createService,
    saveDetailsService,
    getPaymentMethods
  } = require("../controllers/users");

  const {
    validateUpdatedUser,
    validateCoordinates,
    validateDetailsfromService
  } = require("../controllers/users/validators");

/**
 * Updating user data route
 */
router.patch("/updateMe", requireAuth, trimRequest.all, validateUpdatedUser, updateMe);

/**
 * Create a New Service
 */
 router.get("/createService", requireAuth, trimRequest.all,validateCoordinates, createService);


/**
 * Save details from a created service
 */
router.post("/saveDetailsService", requireAuth, trimRequest.all, validateDetailsfromService, saveDetailsService);

/**
 * Get all the payment methods exists
 */
router.get("/getPaymentMethods", trimRequest.all, getPaymentMethods);


module.exports = router;