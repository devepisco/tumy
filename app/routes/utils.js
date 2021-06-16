const express = require("express");
const router = express.Router();
const trimRequest = require("trim-request");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});
const {
  getCancelationReasons,
  autocompletePlace,
  detailPlace,
} = require("../controllers/users");
const {
  validateTypeUser,
  validateAutocompletePlace,
  validateAutocompleteDetailPlace,
} = require("../controllers/users/validators");
router.get(
  "/get/cancelationReasons/:typeUser?",
  trimRequest.all,
  requireAuth,
  validateTypeUser,
  getCancelationReasons
);

router.get(
  "/autocomplete/place",
  trimRequest.all,
  validateAutocompletePlace,
  autocompletePlace
);
router.get(
  "/details/place",
  trimRequest.all,
  validateAutocompleteDetailPlace,
  detailPlace
);
module.exports = router;
