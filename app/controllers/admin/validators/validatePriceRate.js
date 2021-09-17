const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validatePriceRate = [
    check("IdName")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el IdName de la tarifa."),
    check("rateName")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el nombre de la tarifa"),
    check("price")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el precio correspondiente a la tarifa")
        .isNumeric()
        .withMessage("El precio de la tarifa debe contener caracteres numéricos"),
    check("minPrice")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el precio mínimo de la tarifa correspondiente")
        .isNumeric()
        .withMessage("El precio de la tarifa debe contener caracteres numéricos"),
    check("isActive")
        .optional()
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el estado activo: true/false de la tarifa")
        .isBoolean()
        .withMessage("El campo isActive solo admite un dato booleano"),
    (req, res, next)=>{ 
        validateResult(req, res, next)

    }
];
module.exports = { validatePriceRate };
