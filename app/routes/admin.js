const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const { getAllUsers } = require("../controllers/admin");

//get list of users
router.get("/get/users", trimRequest.all, requireAuth, getAllUsers);

module.exports = router;
