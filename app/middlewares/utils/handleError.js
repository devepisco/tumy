const handleError = (
  res = {},
  status = 500,
  message = "Ocurrio un error inesperado"
) => {
  // Prints error in console
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
  if (isNaN(+status)) {
    status = 500;
  }
  // Sends error to user
  return res.status(status).json({
    error: {
      message,
    },
  });
};

module.exports = { handleError };