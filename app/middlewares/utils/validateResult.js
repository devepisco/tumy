const { validationResult } = require("express-validator");
const { handleError } = require("./handleError");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    return next();
  } catch (err) {
    return handleError(res, 422, err.array()[0].msg);
  }
};

module.exports = { validateResult };
