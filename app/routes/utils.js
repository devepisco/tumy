const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const { getCancelationReasons } = require("../controllers/users");
const { validateTypeUser } = require("../controllers/users/validators")
router.get(
  "/get/cancelationReasons/:typeUser?",
  trimRequest.all,
  requireAuth,
  validateTypeUser,
  getCancelationReasons
);
module.exports = router;
