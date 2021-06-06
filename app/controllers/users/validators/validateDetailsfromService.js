const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const { names } = require('../../../middlewares/regex')
const paymentMethods = require('../../../../data/paymentMethods')

const validateDetailsfromService = [
    check('idServicio')
        .exists()
        .withMessage("Debe añadir el Id de solicitud de servicio")
        .not()
        .isEmpty()
        .withMessage('Debe añadir el Id de solicitud de servicio')
        .isLength({
            min:24
        })
        .withMessage("Formato incorrecto del Id de solicitud de servicio"),
    check('descripcion')
        .not()
        .isEmpty()
        .withMessage('Debe añadir una descripcion del paquete'),
    check('nombreRemitente')
        .optional()
        .isString()
        .withMessage('El nombre debe contener caracteres alfabéticos'),
    check('celularRemitente')
        .optional()
        .isNumeric()
        .withMessage("El celular de debe contener caracteres numéricos."),
    check('nombreDestinatario')
        .optional()
        .isString()
        .withMessage('El nombre debe contener caracteres alfabéticos'),
    check('celularDestinatario')
        .optional()
        .isNumeric()
        .withMessage("El celular de debe contener caracteres numéricos."),
    check('montoContraEntrega')
        .optional()
        .isNumeric()
        .withMessage('El monto contra entrega debe contener un valor numérico'),
    check('nameIdPago')
        .optional()
        .isIn(paymentMethods)
        .withMessage('El campo nameIdPago debe estar dentro de la lista de métodos de pago'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]

module.exports = { validateDetailsfromService }