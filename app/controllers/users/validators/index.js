const { validateUpdatedUser } = require("./validateUpdatedUser");
const { validateCoordinates } = require("./validateCoordinates");
const { validateDetailsfromService } = require("./validateDetailsfromService");
const { validateTypeUser } = require("./validateTypeUser");
const { validateAutocompletePlace } = require("./validateAutocompletePlace");
const { validateAutocompleteDetailPlace} = require("./validateAutocompleteDetailPlace");

module.exports = {
  validateUpdatedUser,
  validateCoordinates,
  validateDetailsfromService,
  validateTypeUser,
  validateAutocompletePlace,
  validateAutocompleteDetailPlace
};
