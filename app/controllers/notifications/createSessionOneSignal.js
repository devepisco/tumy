const { structure, objSuccess } = require("../../middlewares/utils");
const Notification = require("../../models/Notification");
const onesignal = require("onesignal-node");

const createSessionOneSignal = structure(async (req, res) => {

  res
    .status(200)
    .json(objSuccess({}, "Sesion One Signal creada exitosamente."));
});
module.exports = { createSessionOneSignal };
