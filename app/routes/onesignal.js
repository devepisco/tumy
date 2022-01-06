const express = require("express");
const router = express.Router();
const {
  createSessionOneSignal,
  sendNotification,
} = require("../controllers/notifications");

const {
  validateCreateSessionOnesignal,
  validateSendNotification,
} = require("../controllers/notifications/validators");

/** Create Session One Signal */
router.post(
  "/create_session",
  validateCreateSessionOnesignal,
  createSessionOneSignal
);

router.post("/send_notification", validateSendNotification, sendNotification);

module.exports = router;
