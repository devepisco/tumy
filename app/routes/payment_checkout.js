const express = require("express");
const router = express.Router();
require("../../config/passport");
const passport = require("passport");
const trimRequest = require("trim-request");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const {
  getTypesDocuments,
  getPaymentMethods,
  createPreference,
} = require("../controllers/paymentCheckout");

const {} = require("../controllers/paymentCheckout/validators");

router.get("/types_documents", requireAuth, getTypesDocuments);

router.get("/payment_methods", requireAuth, getPaymentMethods);

router.post("/preference", requireAuth, createPreference);

module.exports = router;
