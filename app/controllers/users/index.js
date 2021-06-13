const { updateMe } = require("./updateMe");
const { createService } = require("./createService");
const { saveDetailsService } = require("./saveDetailsService");
const { getPaymentMethods } = require("./getPaymentMethods");
const { getGlobalDataServices } = require("./getGlobalDataServices");
const { getDetailDataFromService } = require("./getDetailDataFromService");
const { getDriverFromService } = require("./getDriverFromService");
const { cancelService } = require("./cancelService");
const { savePaymentService } = require("./savePaymentService");
const { getDetailStates } = require("./getDetailStates");

module.exports = {
  updateMe,
  createService,
  saveDetailsService,
  getPaymentMethods,
  getGlobalDataServices,
  getDetailDataFromService,
  getDriverFromService,
  cancelService,
  savePaymentService,
  getDetailStates
};
