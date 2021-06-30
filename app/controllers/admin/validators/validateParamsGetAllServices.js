const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");
const globalStates = require("../../../../data/globalStates");

const validateParamsGetAllServices = [
  check("globalState")
    .optional()
    .isIn(globalStates)
    .withMessage(
      "El parámetro globalState debe contener [en_proceso, entregado, cancelado]"
    ),
  check("beginDate")
    .optional()
    .isDate()
    .withMessage("El parámetro beginDate debe tener formato de fecha"),
  check("endDate")
    .optional()
    .isDate()
    .withMessage("El parámetro endDate debe tener formato de fecha"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateParamsGetAllServices };
