const Exceptions = require("../../../errors/Exceptions");

const errorMiddlewarer = (error, req, res, next) => {
  let message, status;

  if (error instanceof Exceptions) {
    const _error = error.toJson();
    message = _error.message;
    status = 500;
  } else {
    message = error.message;
    status = 500;
  }

  return res.status(status).json({ error: { message } });
};

module.exports = { errorMiddlewarer };