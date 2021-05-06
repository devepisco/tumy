const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateSearchPrice = [
    check('origin')
        .not()
        .isEmpty()
        .withMessage('Debe añadir las coordenadas de origen'),
    check('destination')
        .not()
        .isEmpty()
        .withMessage('Debe añadir las coordenadas de destino'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]

module.exports = { validateSearchPrice }