const express = require("express");
const router = express.Router();
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
    updateMe
  } = require("../controllers/users");

  const {
    validateUpdatedUser
  } = require("../controllers/users/validators");

router.patch("/updateMe", requireAuth, trimRequest.all, validateUpdatedUser, updateMe);

module.exports = router;