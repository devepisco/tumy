const {
  structure,
  isIDGood,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { findDetailState, findGlobalState} = require("../users/helpers");
const { RequestService } = require("../../models/NewServices");
const {
  emitToUpdateService,
  emitServiceToDriver,
} = require("../../middlewares/sockets");
const { matchedData } = require("express-validator");
const { getService } = require("../users/helpers");
const { clientService } = require("../../../config/redis");
const { editInfoDriver } = require("../../../config/helpers/editInfoDriver");

const editDetailState = structure(async (req, res) => {
  const { id, detailstate } =
    matchedData(req);
  const foundDetailState = await findDetailState(detailstate);
  const requestService = await RequestService.findById(id);
  let existDetailState = requestService.detailState.find(
    (state) => state._id == `${foundDetailState._id}`
  );
  if (existDetailState)
    return handleError(
      res,
      400,
      "La solicitud de servicio ya se encuentra en estado: " +
        foundDetailState.stateName
    );
  if (detailstate == "pendiente_recojo") {
    if (requestService.detail.driverUser) {
      const service = await getService();
      emitServiceToDriver(req.user.id, service);
      return handleError(res, 400, "El servicio ya ha sido asignado.");
    }
    requestService.detail.driverUser = req.user._id;
    const foundGlobalState = await findGlobalState("en_proceso");
    requestService.globalState = foundGlobalState._id;
    clientService.get("infoDriver", function (err, reply) {
      const infoDriver = editInfoDriver(reply, {
        id: req.user._id,
        isAvaliable: false,
      });
      console.log("Actualizando estado del conductor", infoDriver);
      clientService.set("infoDriver", infoDriver);
    });
  }
  if (detailstate == "entregado") {
    const foundGlobalState = await findGlobalState("entregado");
    requestService.globalState = foundGlobalState._id;
    if (req.files) {
      for (i in req.files.paymentCaptures) {
        requestService.captures.payment.push(req.files.paymentCaptures[i].filename);
      }
      for (i in req.files.serviceCaptures) {
        requestService.captures.service.push(req.files.serviceCaptures[i].filename);
      }
    }
  }
  requestService.detailState.push({ _id: foundDetailState._id });
  await requestService.save();
  const updatedService = await RequestService.findOne({ _id: id })
    .populate("detailState._id", { _id: 0, IdName: 0, __v: 0 }).populate("globalState",{ _id: 0, IdName: 0, __v: 0 })
    .exec();
  emitToUpdateService(
    updatedService.detail.driverUser,
    updatedService._id,
    updatedService
  );
  res
    .status(200)
    .json(objSuccess({}, "El estado Detalle se actualizó correctamente"));
});
module.exports = { editDetailState };
