const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const Notification = require("../../models/Notification");
const {
  generateAppNotification,
  oneSignalClients,
} = require("../../modules/onesignal");
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
      let foundSession = false;
      foundUser.oneSignalSessions.forEach((e, index) => {
        if (e._id == oneSignalId) {
          foundUser.oneSignalSessions[index].isActive = true;
          foundSession = true;
        }
      });
      await foundUser.save();
      if (foundSession)
        return handleError(res, 400, "El OneSignalId fue activado nuevamente.");

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

const createNotifications = async (
  userId,
  typeNotification,
  title,
  message
) => {
  let foundUser = await Notification.findOne({ userId });

  if (!foundUser) return;
  let oneSignalIdClientsListActives = foundUser.oneSignalSessions
    .filter((n) => n.isActive)
    .map((n) => n._id);
  if (oneSignalIdClientsListActives) {
    /***
     * @var notification { body notification}
     */
    const notification = generateAppNotification(
      typeNotification,
      title,
      message,
      oneSignalIdClientsListActives,
      null
    );
    /**
     * @description procedimiento asyncrono ejecuta la push
     */
    await oneSignalClients.createNotification(notification);
  }
};
module.exports = { createSessionOneSignal, createNotifications };
