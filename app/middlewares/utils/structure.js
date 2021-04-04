const structure = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (error) {
    if (process.env.NODE_ENV == "development") console.error(error);
    next(error);
  }
};

module.exports = { structure };