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
      "https://scontent.ftcq1-1.fna.fbcdn.net/v/t39.30808-6/238137197_357159809413039_2141895608090965866_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeH0ODj4TeUpFraja1u9GLGYkqxz205U-ciSrHPbTlT5yECyYsrC1dAZGUo9VRaDXIgTwodmn8ExdXKfe9L4kgMB&_nc_ohc=JjYbTO6KddgAX9BnKFk&_nc_ht=scontent.ftcq1-1.fna&oh=00_AT9-HIRgvHWI9cX58o-ORbHwMppsSUYCQU9DlkHf3VsCZw&oe=61E62723"
    );
    /**
     * @description procedimiento asyncrono ejecuta la push
     */
    await oneSignalClients.createNotification(notification);
  }
};
module.exports = { createSessionOneSignal, createNotifications };
