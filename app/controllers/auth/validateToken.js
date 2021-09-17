<<<<<<< HEAD
const { getUserIdFromToken } = require("./helpers"),
  {
    isIDGood,
    structure,
    objSuccess,
    handleError ,
  } = require("../../middlewares/utils");

const validateToken = structure(async (req, res) => {
  const tokenEncrypted = req.headers.authorization
    .replace("Bearer ", "")
    .trim();
  let userId = getUserIdFromToken(tokenEncrypted);
  userId = isIDGood(userId);
  if (!userId) return handleError(res, 401, "El token es inválido");
  res.status(200).json(
    objSuccess({isValidate: true })
    );
});

module.exports = { validateToken };
=======
const { getUserIdFromToken } = require("./helpers"),
  {
    isIDGood,
    structure,
    objSuccess,
    handleError ,
  } = require("../../middlewares/utils");

const validateToken = structure(async (req, res) => {
  const tokenEncrypted = req.headers.authorization
    .replace("Bearer ", "")
    .trim();
  let userId = getUserIdFromToken(tokenEncrypted);
  userId = isIDGood(userId);
  if (!userId) return handleError(res, 401, "El token es inválido");
  res.status(200).json(
    objSuccess({isValidate: true })
    );
});

module.exports = { validateToken };
>>>>>>> 4c1d85377640cc96ff9341775a4418a622f5316a
