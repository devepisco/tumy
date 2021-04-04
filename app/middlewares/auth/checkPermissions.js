const { handleError } = require('../utils')

const checkPermissions = (roles = [], { role = "" }, res, next) => {
  if (roles.indexOf(role) > -1) {
    return next();
  }
  return handleError(res, 403, 'No esta autorizado')
};

module.exports = { checkPermissions };
