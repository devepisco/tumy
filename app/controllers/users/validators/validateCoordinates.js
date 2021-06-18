const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateCoordinates = [
    check('origin')
        .not()
        .isEmpty()
        .withMessage('Debe añadir las coordenadas/place_id de origen'),
    check('destination')
        .not()
        .isEmpty()
        .withMessage('Debe añadir las coordenadas/place_id de destino'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]

module.exports = { validateCoordinates }