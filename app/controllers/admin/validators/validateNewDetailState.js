const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateNewDetailState = [
    check('IdName')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el IdName del estado de detalle."),
    check('stateName')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar el stateName del estado de detalle"),
    (req, res, next)=>{ 
        validateResult(req, res, next)

    }
]
module.exports = {validateNewDetailState}