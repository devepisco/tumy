const { check } = require("express-validator");
const { validateResult } = require("../../../middlewares/utils");

const validateIdRequestDriver = [
  check('id')
    .not()
    .isEmpty()
    .withMessage("El parámetro id no debe ir vacío.")
    .isMongoId()
    .withMessage("Formato incorrecto para el param: id"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = {
  validateIdRequestDriver,
};
