const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateCreateSessionOnesignal = [
  check("userId")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un Id de usuario en Tumi APP")
    .isMongoId()
    .withMessage("Formato de ID incorrecto."),
  check("oneSignalId")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un ID de OneSignal"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateSessionOnesignal };
