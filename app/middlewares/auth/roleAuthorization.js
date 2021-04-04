const { checkPermissions } = require("./checkPermissions");

const roleAuthorization = (...roles) => (req, res, next) =>
  checkPermissions(roles, req.user, res, next);

module.exports = { roleAuthorization };
