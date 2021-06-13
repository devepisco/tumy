const express = require("express");
const router = express.Router();
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
  updateMe,
  createService,
  saveDetailsService,
  getPaymentMethods,
  getGlobalDataServices,
  getDetailDataFromService,
  getDriverFromService,
  cancelService,
  savePaymentService,
} = require("../controllers/users");

const {
  validateUpdatedUser,
  validateCoordinates,
  validateDetailsfromService,
} = require("../controllers/users/validators");

/**
 * Updating user data route
 */
router.patch(
  "/updateMe",
  trimRequest.all,
  requireAuth,
  validateUpdatedUser,
  updateMe
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
 * Get the driver from a service
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
router.get("/cancelService/:id", trimRequest.all, requireAuth, cancelService);

module.exports = router;
