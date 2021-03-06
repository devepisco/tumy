const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')
const { passwordRegex, names } = require("../../../middlewares/regex")
const typeDocument = require("../../../../data/typeDocument")

const validateRegisterDriver = [
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
    check('typeID')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el tipo de Documento')
        .isIn(typeDocument)
        .withMessage(`El tipo de Documento debe estar entre ${typeDocument.join(", ")}`),
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
    check('numSOAT')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el número de SOAT')
        .isNumeric()
        .withMessage('El número de SOAT debe contener caracteres numéricos'),
    check('numPlaca')
        .not()
        .isEmpty()
        .withMessage('Debe añadir la placa del vehiculo motorizado'),
    check('numTarjetaPropiedad')
        .not()
        .isEmpty()
        .withMessage('Debe añadir el número de tarjeta de propiedad')
        .isString()
        .isLength({
            max: 17
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
    check('profilePicture')
        .custom(
            (value, {req}) => {
                if(!req.file)return false;
                else{
                    switch (req.file.mimetype) {
                        case 'image/jpg':
                            return '.jpg';
                        case 'image/jpeg':
                            return '.jpeg';
                        case  'image/png':
                            return '.png';
                        default:
                            return false;
                    }
                }
            }
            )
        .withMessage('Debe registrar una imagen de perfil válida del repartidor'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]
  
  module.exports = { validateRegisterDriver }