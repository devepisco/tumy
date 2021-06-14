const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateUserId = [
  check("id")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar el ID usuario como parámetro.")
    .isMongoId()
    .withMessage("Formato de ID incorrecto."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateUserId };
