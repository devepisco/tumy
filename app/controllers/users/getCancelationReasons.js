const { matchedData } = require("express-validator");
const { objSuccess } = require("../../middlewares/utils");
const driverCancelationReasons = require("../../../data/driverCancelationReasons");
const userCancelationReasons = require("../../../data/userCancelationReasons");

const getCancelationReasons = (req, res) => {
  const { typeUser } = matchedData(req);
  if (typeUser == "driver") {
    res.status(200).json(objSuccess(driverCancelationReasons));
  } else if (typeUser == "user") {
    res.status(200).json(objSuccess(userCancelationReasons));
  } else
    res
      .status(200)
      .json(
        objSuccess({},"No hay razones registrados para este tipo de usuario.")
      );
};
module.exports = { getCancelationReasons };
