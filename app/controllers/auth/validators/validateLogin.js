const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const { passwordRegex } = require("../../../middlewares/regex")

const validateLogin = [
    check('email')
      .exists()
      .withMessage('Debe añadir el correo electrónico')
      .not()
      .isEmpty()
      .withMessage('Debe añadir el correo electrónico')
      .isEmail()
      .withMessage('Correo electrónico no válido'),
    check('password')
      .exists()
      .withMessage('Debe añadir la contraseña')
      .not()
      .isEmpty()
      .withMessage('Debe añadir la contraseña')
      .isLength({
        min: 8
      })
      .withMessage('La contraseña es muy corta, debe ser de almenos 8 caracteres')
      .matches(passwordRegex)
      .withMessage("La contraseña debe contener almenos una letra y un número"),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
  
  module.exports = { validateLogin }