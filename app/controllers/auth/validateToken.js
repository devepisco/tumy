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
  if (!userId) return handleError(res, 401, "El token es inválido");
  userId = isIDGood(userId);
  if (!userId) return handleError(res, 401, "El token es inválido");
  return res.status(200).json(
    objSuccess({isValidate: true })
    );
});

module.exports = { validateToken };
