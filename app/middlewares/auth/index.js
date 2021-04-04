const { checkPassword } = require("./checkPassword"),
  { checkPermissions } = require("./checkPermissions"),
  { roleAuthorization } = require("./roleAuthorization");

module.exports = {
  checkPassword,
  checkPermissions,
  roleAuthorization,
};
