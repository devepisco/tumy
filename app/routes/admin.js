const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const {
  getAllUsers,
  getUserDetail,
  insertDetailState,
  getAllDetailStates
} = require("../controllers/admin");
const { validateNewDetailState } = require("../controllers/admin/validators");

//get list of users
router.get("/get/users/:typeUser?", trimRequest.all, requireAuth, getAllUsers);

//get detail from user._id
router.get("/get/userDetail/:id", trimRequest.all, requireAuth, getUserDetail);

//insert detailStates
router.get(
  "/insert/detailState",
  trimRequest.all,
  requireAuth,
  validateNewDetailState,
  insertDetailState
);

//get all detail states
router.get("/get/all/detailStates",trimRequest.all, requireAuth, getAllDetailStates)

module.exports = router;