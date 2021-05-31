const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const { names, ruc } = require("../../../middlewares/regex")
const typeDocument = require("../../../..//data/typeDocument")

const validateUpdatedUser = [
    check('firstname')
        .not()
        .isEmpty()
        .withMessage('Debe añadir un nombre como mínimo')
        .matches(names)
        .withMessage('El nombre debe contener caracteres alfabéticos'),
    check('lastname')
        .not()
        .isEmpty()
        .withMessage('Debe añadir sus apellidos')
        .matches(names)
        .withMessage('El apellido debe contener caracteres alfabéticos'),
    check('IDType')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el tipo de Documento')
        .isIn(typeDocument)
        .withMessage(`El tipo de Documento debe estar entre ${typeDocument.join(", ")}`),
    check('IDNumber')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el número de DNI')
        .isNumeric()
        .withMessage('El número de ID debe contener caracteres numéricos')
        .isLength({
            min: 8
          })
        .withMessage('El ID debe tener como mínimo 8 caracteres'),
    check('business')
        .isObject(),
    check('business.name')
        .optional(),
    check('business.socialReason')
        .optional(),
    check('business.ruc')
        .optional()
        .isNumeric()
        .withMessage('El RUC debe contener caracteres numéricos')
        .matches(ruc)
        .withMessage('El RUC debe contener 11 caracteres'),
    check('phone')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el número de celular')
        .isNumeric()
        .withMessage('El número de celular debe contener caracteres numéricos')
        .isLength({
            min: 9
          })
        .withMessage('El número de celular debe tener como mínimo 9 dígitos'),
    check('email')
        .exists()
        .withMessage('Debe añadir el correo electrónico')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el correo electrónico')
        .isEmail()
        .withMessage('Correo electrónico no válido'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
  
  module.exports = { validateUpdatedUser }