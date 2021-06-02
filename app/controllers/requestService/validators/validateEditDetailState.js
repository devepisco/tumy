const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateEditDetailState = [
    check('id')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un Id de Solicitud de Servicio"),
    check('detailstate')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un estado detalle")
        .isIn(globalstates.IdName)
        .withMessage("Debe añadir un estado de tipo IdName del Estado Detalle correspondiente"),
    (req, res, next) => {
            validateResult(req, res, next)
    }
]

module.exports = { validateEditDetailState }