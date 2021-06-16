const { updateUser } = require("./updateUser");
const { createService } = require("./createService");
const { saveDetailsService } = require("./saveDetailsService");
const { getPaymentMethods } = require("./getPaymentMethods");
const { getGlobalDataServices } = require("./getGlobalDataServices");
const { getDetailDataFromService } = require("./getDetailDataFromService");
const { getDriverFromService } = require("./getDriverFromService");
const { cancelService } = require("./cancelService");
const { savePaymentService } = require("./savePaymentService");
const { getDetailStates } = require("./getDetailStates");
const { getCancelationReasons } = require("./getCancelationReasons");
const { autocompletePlace } = require("./autocompletePlace");
const { detailPlace } = require("./detailPlace");

module.exports = {
  updateUser,
  createService,
  saveDetailsService,
  getPaymentMethods,
  getGlobalDataServices,
  getDetailDataFromService,
  getDriverFromService,
  cancelService,
  savePaymentService,
  getDetailStates,
  getCancelationReasons,
  autocompletePlace,
  detailPlace,
};
