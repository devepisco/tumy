const express = require("express");
const router = express.Router();
require("../../config/passport");
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const { uploadServicePictures } = require("../../config/multer");

const {
  getRequestDriver,
  acceptRequestDriver,
  rejectRequestDriver,
  driverCancelService
} = require("../controllers/drivers");

const { editDetailState } = require("../controllers/requestService");

const {
  validateEditDetailState,
} = require("../controllers/requestService/validators");
/*
 * GET request drivers
 */
router.get("/driver", trimRequest.query, requireAuth, getRequestDriver);

/**
 * Accept request drivers
 */
router.get("/accept/:id", trimRequest.param, requireAuth, acceptRequestDriver);

/**
 * Reject request drivers
 */
router.get("/reject/:id", trimRequest.param, requireAuth, rejectRequestDriver);

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
router.post("cancel/service/:id", trimRequest.all, requireAuth, driverCancelService)

module.exports = router;
