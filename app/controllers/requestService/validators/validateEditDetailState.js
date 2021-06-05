const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const detailstate = require('../../../../data/detailStates')

const validateEditDetailState = [
    check('id')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un Id de Solicitud de Servicio")
        .isMongoId()
        .withMessage("Formato de ID incorrecto."),
    check('detailstate')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un estado detalle")
        .isIn(detailstate)
        .withMessage("Debe añadir un estado de tipo IdName del Estado Detalle correspondiente"),
    (req, res, next) => {
            validateResult(req, res, next)
    }
]

module.exports = { validateEditDetailState }