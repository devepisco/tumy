const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");

const validateStatus = [
    check('status')
        .optional()
        .isIn(["Aceptada","Rechazada","Pendiente"])
        .withMessage("Debe ingresar una acción entre aceptada/rechazada/pendiente"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
]
module.exports = { validateStatus }