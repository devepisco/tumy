const { check } = require("express-validator");
const { images } = require("../../../middlewares/regex");
const { validateResult } = require("../../../middlewares/utils");

const validateProfilePicture = [
  check("profilePicture")
    .custom((value, { req }) => {
      if (!req.files) return true;
      else if (!req.files.profilePicture) return true;
      else if (images.test(req.files.profilePicture[0].mimetype) === false) return false;
      else return true;
    })
    .withMessage("La foto de perfil tiene un formato incorrecto."),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];
module.exports = { validateProfilePicture };
