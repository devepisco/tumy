const { updateUser } = require("./updateUser");
const { createService } = require("./createService");
const { saveDetailsService } = require("./saveDetailsService");
const { getPaymentMethods } = require("./getPaymentMethods");
const { getGlobalDataServices } = require("./getGlobalDataServices");
const { getDetailDataFromService } = require("./getDetailDataFromService");
const { getDriverFromService } = require("./getDriverFromService");
const { cancelService } = require("./cancelService");
const { savePaymentService } = require("./savePaymentService");
const { getCancelationReasons } = require("./getCancelationReasons");
const { autocompletePlace } = require("./autocompletePlace");
const { detailPlace } = require("./detailPlace");
const { updateProfilePicture }= require("./updateProfilePicture");
const { getMostSearchedAdresses }= require("./getMostSearchedAdresses");

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
  getCancelationReasons,
  autocompletePlace,
  detailPlace,
  updateProfilePicture,
  getMostSearchedAdresses
};
