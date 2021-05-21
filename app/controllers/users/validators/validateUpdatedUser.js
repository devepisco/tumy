const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const { passwordRegex } = require("../../../middlewares/regex")

const validateUpdatedUser = [
    check('firstname')
        .not()
        .isEmpty()
        .withMessage('Debe añadir un nombre como mínimo')
        .isString()
        .withMessage('El nombre debe contener caracteres alfabéticos'),
    check('lastname')
        .not()
        .isEmpty()
        .withMessage('Debe añadir sus apellidos')
        .isString()
        .withMessage('El apellido debe contener caracteres alfabéticos'),
    check('typeID')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el tipo de Documento')
        .isAlpha()
        .withMessage('El tipo de ID debe contener caracteres alfabéticos'),
    check('numID')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el número de DNI')
        .isNumeric()
        .withMessage('El número de ID debe contener caracteres numéricos')
        .isLength({
            min: 8
          })
        .withMessage('El ID debe tener como mínimo 8 caracteres'),
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
    // check('password')
    //     .exists()
    //     .withMessage('Debe añadir la contraseña')
    //     .not()
    //     .isEmpty()
    //     .withMessage('Debe añadir la contraseña')
    //     .isLength({
    //       min: 8
    //     })
    //     .withMessage('La contraseña es muy corta, debe ser de almenos 8 caracteres')
    //     .matches(passwordRegex)
    //     .withMessage("La contraseña debe contener almenos una letra y un número"),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
  
  module.exports = { validateUpdatedUser }