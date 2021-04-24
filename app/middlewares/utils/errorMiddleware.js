const Exceptions = require("../../../errors/Exceptions");

const errorMiddlewarer = (error, req, res, next) => {
  let message, status;

  if (error instanceof Exceptions) {
    const _error = error.toJson();
    message = _error.message;
    status = _error.status || 500;
  } else {
    message = error.message;
    status = 500;
  }
  if(process.env.NODE_ENV == 'development')
    console.error(error)

  return res.status(status).json({ error: { message } });
};

module.exports = { errorMiddlewarer };