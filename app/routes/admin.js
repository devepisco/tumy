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
  addPriceRate,
  addComission,
  getComissions,
  editComission,
  getComissionsDriver,
  getAllServices,
  getMaxReachService,
  editMaxReachService,
} = require("../controllers/admin");
const { getRequestDriverDetail } = require("../controllers/drivers");
const {
  validateNewDetailState,
  validateUserStatus,
  validatePriceRate,
  validateComission,
  validateEditComission,
  validateIdDriver,
  validateParamsGetAllServices,
} = require("../controllers/admin/validators");
const {
  validateTypeUser,
  validateUpdatedUser,
} = require("../controllers/users/validators");
const {
  validateIdRequestDriver,
} = require("../controllers/drivers/validators");
/** Users */

router.get(
  "/get/users/:typeUser?",
  trimRequest.all,
  requireAuth,
  validateTypeUser,
  getAllUsers
);

router.get("/get/userDetail/:id?", trimRequest.all, requireAuth, getUserDetail);

router.put(
  "/edit/user/:id?",
  trimRequest.all,
  requireAuth,
  validateUpdatedUser,
  updateUsers
);

router.patch(
  "/:action/user/:id?",
  trimRequest.all,
  requireAuth,
  validateUserStatus,
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

/** Comissions  Model*/
router.post(
  "/add/comission",
  trimRequest.all,
  requireAuth,
  validateComission,
  addComission
);
router.get("/get/comissions", trimRequest.all, requireAuth, getComissions);
router.put(
  "/edit/comission/:comissionName",
  trimRequest.all,
  requireAuth,
  validateEditComission,
  editComission
);
router.get(
  "/get/comissions/driver/:id?",
  trimRequest.all,
  requireAuth,
  validateIdDriver,
  getComissionsDriver
);

/** Price Rates */
router.get(
  "/get/all/pricerates",
  trimRequest.all,
  requireAuth,
  getAllPricerates
);

router.post(
  "/add/pricerate",
  trimRequest.all,
  requireAuth,
  validatePriceRate,
  addPriceRate
);

router.put(
  "/edit/pricerate/:IdName",
  trimRequest.all,
  requireAuth,
  validatePriceRate,
  editPriceRate
);

/* Get All Request Services */
router.get(
  "/get/all/services",
  trimRequest.all,
  requireAuth,
  validateParamsGetAllServices,
  getAllServices
);

/* Get request driver detail */
router.get(
  "/get/requestDriver/:id",
  trimRequest.all,
  requireAuth,
  validateIdRequestDriver,
  getRequestDriverDetail
);

router.get(
  "/get/maxreachservice",
  trimRequest.all,
  requireAuth,
  getMaxReachService
);
router.get(
  "/edit/maxreachservice/:value",
  trimRequest.all,
  requireAuth,
  editMaxReachService
);
module.exports = router;
