const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");
const cancelationReasonsCulqi = require("../../../../data/cancelationReasonsCulqi");

const validateCancelService = [
  check("id")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un Id de servicio"),
  check("reason")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Debe ingresar una razon de la devolución del dinero")
    .isIn(cancelationReasonsCulqi)
    .withMessage("Debe ingresar una razón válida predefinida:"+cancelationReasonsCulqi),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateCancelService };
