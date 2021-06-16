const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateUserStatus = [
  check("action")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar la acción a realizar.")
    .isIn(["block", "unblock"])
    .withMessage("Debe ingresar una acción entre block/unblock"),
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
module.exports = { validateUserStatus };
