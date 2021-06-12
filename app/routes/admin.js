const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const { getAllUsers,getUserDetail } = require("../controllers/admin");

//get list of users
router.get("/get/users", trimRequest.all, requireAuth, getAllUsers);

//get detail from user._id
router.get("/get/userDetail/:id", trimRequest.all, requireAuth, getUserDetail);

module.exports = router;
