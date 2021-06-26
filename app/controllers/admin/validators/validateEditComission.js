const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateEditComission = [
    check('id')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el Id de la Tarifa de comisión"),
    check("comissionName")
        .optional()
        .not()
        .isEmpty()
        .withMessage("El campo comissionName no puede estar vacío"),
    check("amount")
        .optional()
        .isNumeric()
        .withMessage("El porcentaje de la tarifa debe contener caracteres numéricos"),
    (req, res, next)=>{ 
        validateResult(req, res, next)

    }
];
module.exports = { validateEditComission }