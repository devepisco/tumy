const { structure, objSuccess } = require("../../middlewares/utils");
const Notification = require("../../models/Notification");

const deleteSessionOnesignal = structure(async (req, res) => {
  const { userId, oneSignalId } = req.body;
  let session = await Notification.findOne({ userId });
  session.oneSignalSessions.forEach((e, index) => {
    if (e._id == oneSignalId) {
      session.oneSignalSessions[index].isActive = false;
    }
  });
  await session.save();
  res
    .status(200)
    .json(objSuccess({}, "sesion OneSignal desactivada correctamente."));
});
module.exports = { deleteSessionOnesignal };
