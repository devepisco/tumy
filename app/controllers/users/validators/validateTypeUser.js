const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");
const users = require("../../../../data/users")

const validateTypeUser = [
  check("typeUser")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar el tipo de usuario como parámetro.")
    .isIn(users)
    .withMessage("Ingrese un tipo de usuario registrado."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = { validateTypeUser };
