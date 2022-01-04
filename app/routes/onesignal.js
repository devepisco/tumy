const express = require("express");
const router = express.Router();
const {
  createSessionOneSignal,
} = require("../controllers/notifications/createSessionOneSignal");

/** Create Session One Signal */
router.post("/create_session", createSessionOneSignal);

module.exports = router;
