const express = require("express");
const router = express.Router();
require("../../config/passport");
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const { uploadServicePictures, uploadCancelationPictures } = require("../../config/multer");

const {
  getRequestDriver,
  acceptRequestDriver,
  driverCancelService,
} = require("../controllers/drivers");

const { editDetailState } = require("../controllers/requestService");

const {
  validateEditDetailState,
} = require("../controllers/requestService/validators");
const {
  validateDriverCancelService,
  validateStatusRequestDriver,
  validateStatus
} = require("../controllers/drivers/validators");
/*
 * GET request drivers
 */
router.get("/driver/:status?", trimRequest.all, requireAuth, validateStatus, getRequestDriver);

/**
 * Accept/Reject request drivers
 */
router.put("/:action/:id", trimRequest.all, requireAuth, validateStatusRequestDriver, acceptRequestDriver);

/**
 * Update/Edit DetailStates
 */
router.patch(
  "/:id/:detailstate",
  trimRequest.all,
  requireAuth,
  uploadServicePictures,
  validateEditDetailState,
  editDetailState
);

/**
 * Cancel Service with reason
 */
router.post(
  "/cancel/service/:id",
  trimRequest.all,
  requireAuth,
  uploadCancelationPictures,
  validateDriverCancelService,
  driverCancelService
);

module.exports = router;
