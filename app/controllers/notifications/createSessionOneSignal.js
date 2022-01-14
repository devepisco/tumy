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
      "https://scontent.ftcq1-1.fna.fbcdn.net/v/t1.6435-9/118123824_133484671780555_6245394414513594221_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=e3f864&_nc_eui2=AeFFdTSABPsFYzC_bLX6TyeUDWseAl-8RecNax4CX7xF589UtM9Rz-QLzZGl4ZSWmlSMdVH4I74L8TW1N-h5F201&_nc_ohc=XMue5tVRk7IAX87nnYf&tn=-wHbLT7mKjxK2wz1&_nc_ht=scontent.ftcq1-1.fna&oh=00_AT-cvuwhnVew2d-NQzuisHGdkgAprPfPLWHW0mHsHfTC7Q&oe=62081DE4"
    );
    /**
     * @description procedimiento asyncrono ejecuta la push
     */
    await oneSignalClients.createNotification(notification);
  }
};
module.exports = { createSessionOneSignal, createNotifications };
