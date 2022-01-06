const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const Notification = require("../../models/Notification");
const { matchedData } = require("express-validator");

const createSessionOneSignal = structure(async (req, res) => {
  const { userId, oneSignalId } = matchedData(req);
  try {
    /** Comprobar si existe el userId registrado, si existe agregar el onesignalId, caso contrario crear nuevo registro */
    let foundUser = await Notification.findOne({ userId });
    if (!foundUser) {
      const session = new Notification({
        userId: userId,
        oneSignalSessions: {
          _id: oneSignalId,
        },
      });
      const data = await session.save();
      res
        .status(200)
        .json(objSuccess(data, "Sesion One Signal creada exitosamente."));
    } else {
      const foundOneSignalId = foundUser.oneSignalSessions.find(
        (e) => e._id === oneSignalId
      );
      if (foundOneSignalId)
        return handleError(
          res,
          400,
          "El OneSignalId ya fue registrado con ese usuario"
        );
      foundUser.oneSignalSessions.push({ _id: oneSignalId });
      const data = await foundUser.save();
      res
        .status(200)
        .json(objSuccess(data, "Sesion One Signal agregada exitosamente."));
    }
  } catch (error) {
    res.status(400).json(objSuccess({}, "Ocurrio un error en el sistema"));
    console.log(error);
  }
});
module.exports = { createSessionOneSignal };
