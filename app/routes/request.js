const express = require("express");
const router = express.Router();
require("../../config/passport");
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});


const {
  getRequestDriver
} = require("../controllers/drivers");

/*
 * GET request drivers
 */
router.get("/driver", trimRequest.query, requireAuth, getRequestDriver);

module.exports = router;
