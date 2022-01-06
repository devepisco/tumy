const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateSendNotification = [
  check("app_id")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un Id de usuario en Tumi APP"),
  check("include_external_user_ids")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un ID externo a OneSignal"),
  check("channel_for_external_user_ids")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un canal para usuarios externos en OneSignal"),
  check("data")
    .optional()
    .isObject()
    .withMessage("El campo data debe ser un objeto"),
  check("contents")
    .optional()
    .isObject()
    .withMessage("El campo data debe ser un objeto"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateSendNotification };
