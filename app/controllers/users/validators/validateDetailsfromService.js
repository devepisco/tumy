const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateDetailsfromService = [
    check('idServicio')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el Id de solicitud de servicio'),
    check('nombreRemitente')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el nombre del remitente'),
    check('celularRemitente')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el celular del remitente'),
    check('nameIdPago')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el nameId de Pago contra entrega'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]

module.exports = { validateDetailsfromService }