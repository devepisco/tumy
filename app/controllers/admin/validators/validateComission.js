const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateComission = [
    check("comissionName")
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el nombre de la tarifa"),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el precio correspondiente a la tarifa")
        .isNumeric()
        .withMessage("El precio de la tarifa debe contener caracteres numéricos"),
    (req, res, next)=>{ 
        validateResult(req, res, next)

    }
];
module.exports = { validateComission }