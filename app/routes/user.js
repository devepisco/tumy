const express = require("express");
const router = express.Router();
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
  updateUser,
  createService,
  saveDetailsService,
  getPaymentMethods,
  getGlobalDataServices,
  getDetailDataFromService,
  getDriverFromService,
  cancelService,
  savePaymentService,
  updateProfilePicture,
} = require("../controllers/users");

const {
  validateUpdatedUser,
  validateCoordinates,
  validateDetailsfromService,
  validateCancelService,
  validateProfilePicture
} = require("../controllers/users/validators");

const {
  uploadProfilePicture
} = require("../../config/multer");
/**
 * Updating user data route
 */
router.patch(
  "/updateMe",
  trimRequest.all,
  requireAuth,
  validateUpdatedUser,
  updateUser
);
/* Update profile picture */
router.put(
  "/update/profilePicture",
  trimRequest.all,
  requireAuth,
  uploadProfilePicture,
  validateProfilePicture,
  updateProfilePicture
);

/**
 * Create a New Service
 */
router.post(
  "/createService",
  trimRequest.all,
  requireAuth,
  validateCoordinates,
  createService
);

/**
 * Save details from a created service
 */
router.post(
  "/saveDetailsService",
  trimRequest.all,
  requireAuth,
  validateDetailsfromService,
  saveDetailsService
);

/**
 * Save payment service's
 */
router.post("/savePayment", trimRequest.all, requireAuth, savePaymentService);

/**
 * Get all the payment methods exists
 */
router.get("/getPaymentMethods", trimRequest.all, getPaymentMethods);

/**
 * Get the Global Data from service
 */
router.get("/getServices", trimRequest.all, requireAuth, getGlobalDataServices);

/**
 * Get the Detail Data from service
 */
router.get(
  "/getService/:id",
  trimRequest.all,
  requireAuth,
  getDetailDataFromService
);

/**
 * Get the driver from a service
 */
router.get(
  "/getService/:id/driver",
  trimRequest.all,
  requireAuth,
  getDriverFromService
);

/**
 * Cancel the Service request
 */
router.get(
  "/cancelService/:id",
  trimRequest.all,
  requireAuth,
  validateCancelService,
  cancelService
);

module.exports = router;
