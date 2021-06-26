const { validateNewDetailState } = require("./validateNewDetailState");
const { validateUserStatus } = require("./validateUserStatus");
const { validatePriceRate } = require("./validatePriceRate");
const { validateComission } = require("./validateComission");
const { validateEditComission}= require("./validateEditComission");
module.exports = { 
    validateNewDetailState, 
    validateUserStatus,
    validatePriceRate,
    validateComission,
    validateEditComission
};
