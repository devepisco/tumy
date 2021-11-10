const { findGlobalState } = require("../../app/controllers/users/helpers");
const { isIDGood } = require("../../app/middlewares/utils");
const { RequestService } = require("../../app/models/NewServices");

const checkCurrentOrders = async (id) => {
  const GlobalStateId = await findGlobalState("en_proceso");
  const driverId = isIDGood(id);
  let data = await RequestService.findOne({
    "detail.driverUser": driverId,
    globalState: GlobalStateId,
  })
    .sort({ _id: -1 })
    .populate("detailState._id", { _id: 0, IdName: 0, __v: 0 })
    .populate("globalState", { _id: 0, IdName: 0, __v: 0 })
    .populate("detail.driverUser", { firstname: 1, lastname: 1 })
    .exec();
  return data;
};
module.exports = { checkCurrentOrders };
