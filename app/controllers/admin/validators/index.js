const { validateNewDetailState } = require("./validateNewDetailState");
const { validateUserStatus } = require("./validateUserStatus");
const { validatePriceRate } = require("./validatePriceRate");
const { validateComission } = require("./validateComission");
const { validateEditComission } = require("./validateEditComission");
const { validateIdDriver } = require("./validateIdDriver");
const { validateParamsGetAllServices} =require("./validateParamsGetAllServices");
module.exports = {
  validateNewDetailState,
  validateUserStatus,
  validatePriceRate,
  validateComission,
  validateEditComission,
  validateIdDriver,
  validateParamsGetAllServices
};
