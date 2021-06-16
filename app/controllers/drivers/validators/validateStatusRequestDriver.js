const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateStatusRequestDriver = [
    check('action')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar la acción a realizar.")
        .isIn(["accept","reject"])
        .withMessage("Debe ingresar una acción entre accept/reject"),
    check('id')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el Id del motorizado.")
        .isMongoId()
        .withMessage("El formato del Id del motorizado es incorrecto."),
    check('reason')
        .optional()
        .isString()
        .withMessage("El campo reason debe contener una cadena de texto."),
    (req, res, next) => {
        validateResult(req, res, next);
    },
]
module.exports = { validateStatusRequestDriver }