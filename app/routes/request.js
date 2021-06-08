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
router.get(
  "/:id/:detailstate",
  trimRequest.all,
  requireAuth,
  uploadServicePictures,
  validateEditDetailState,
  editDetailState
);

module.exports = router;
