const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateIdDriver = [
    check('id')
        .optional()
        .not()
        .isEmpty()
        .withMessage("El parámetro id no puede ir vacío")
        .isMongoId()
        .withMessage("El parámetro id tiene un formato incorrecto"),
    check('globalState')
        .optional()
        .isIn(["entregado","cancelado"])
        .withMessage("El parámetro globalState debe contener [entregado/cancelado]"),
    check('beginDate')
        .optional()
        .isDate()
        .withMessage("El parámetro beginDate debe tener formato de fecha"),
    check('endDate')
        .optional()
        .isDate()
        .withMessage("El parámetro endDate debe tener formato de fecha"),
    (req, res, next)=>{ 
        validateResult(req, res, next)

    }
];
module.exports = { validateIdDriver };
