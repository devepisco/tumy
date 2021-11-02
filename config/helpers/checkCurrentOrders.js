const { findGlobalState } = require("../../app/controllers/users/helpers");
const { isIDGood } = require("../../app/middlewares/utils");
const { RequestService } = require("../../app/models/NewServices");

const checkCurrentOrders = async (id) => {
  const GlobalStateId = await findGlobalState("en_proceso");
  const driverId = isIDGood(id);
  let data = await RequestService.findOne({
    "detail.driverUser": driverId,
    globalState: GlobalStateId,
  });
  if (data === null) data = {};
  return data;
};
module.exports = { checkCurrentOrders };
