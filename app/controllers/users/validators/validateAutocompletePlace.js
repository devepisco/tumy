const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateAutocompletePlace = [
    check('place')
        .not()
        .isEmpty()
        .withMessage('Debe ingresar la cadena de texto a buscar.'),
    // check('types')
    //     .not()
    //     .isEmpty()
    //     .withMessage('Debe ingresar una clasificación de busqueda.'),
    // check('language')
    //     .not()
    //     .isEmpty()
    //     .withMessage('Debe ingresar el idioma de búsqueda.'),
    // check('components')
    //     .not()
    //     .isEmpty()
    //     .withMessage('Debe añadir el/los pais/paises donde se hará la busqueda. <country:pe>'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
  ]

module.exports = { validateAutocompletePlace }