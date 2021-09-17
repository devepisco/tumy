const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateEditComission = [
    check("comissionName")
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