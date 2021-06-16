const { validateResult } = require('../../../middlewares/utils')
const { check } = require('express-validator')

const validateAutocompleteDetailPlace = [
    check('place_id')
        .not()
        .isEmpty()
        .withMessage('Debe ingresar el Id correspondiente al lugar de búsqueda'),
];
module.exports = { validateAutocompleteDetailPlace };
