const { errorMiddlewarer } = require("./errorMiddleware"),
  { handleError } = require("./handleError"),
  { structure } = require("./structure"),
  { removeExtensionFromFile } = require("./removeExtensionFromFile"),
  { isIDGood } = require("./isIDGood"),
  { validateResult } = require("./validateResult"),
  { sendEmail } = require("./email"),
  { cleanQuery } = require("./cleanQuery"),
  { objSuccess } = require("./objSuccess");


module.exports = {
  errorMiddlewarer,
  handleError,
  structure,
  isIDGood,
  removeExtensionFromFile,
  validateResult,
  sendEmail,
  objSuccess,
  cleanQuery
};
