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
  getAllDetailStates,
  blockUser,
  updateUsers,
  getAllPricerates,
  editPriceRate,
  addPriceRate
} = require("../controllers/admin");
const {
  validateNewDetailState,
  validateUserId,
  validatePriceRate
} = require("../controllers/admin/validators");
const { validateTypeUser, validateUpdatedUser } = require("../controllers/users/validators");

/** Users */

router.get(
  "/get/users/:typeUser?",
  trimRequest.all,
  requireAuth,
  validateTypeUser,
  getAllUsers
);

router.get("/get/userDetail/:id?", trimRequest.all, requireAuth, getUserDetail);

router.put("/edit/user/:id?", trimRequest.all, requireAuth, validateUpdatedUser, updateUsers);

router.patch(
  "/block/user/:id?",
  trimRequest.all,
  requireAuth,
  validateUserId,
  blockUser
);

//insert detailStates
router.get(
  "/add/detailstate",
  trimRequest.all,
  requireAuth,
  validateNewDetailState,
  insertDetailState
);

//get all detail states
router.get(
  "/get/all/detailstates",
  trimRequest.all,
  requireAuth,
  getAllDetailStates
);

/** Comissions */

/** Price Rates */
router.get("/get/all/pricerates", trimRequest.all, requireAuth, getAllPricerates );

router.post("/add/pricerate", trimRequest.all, requireAuth,validatePriceRate, addPriceRate)

router.put("/edit/pricerate/:IdName", trimRequest.all, requireAuth, validatePriceRate, editPriceRate);

module.exports = router;
