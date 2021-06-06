const mongoose = require('mongoose');

const {
  structure,
  isIDGood,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { findDetailState } = require("../users/helpers/findDetailState");
const { RequestService, GlobalState, DetailState } = require("../../models/NewServices");
const { emitToUpdateService, emitServiceToDriver } = require("../../middlewares/sockets");
const { matchedData } = require("express-validator");
const { getService } = require("../users/helpers");
const { clientService } = require("../../../config/redis");
const { editInfoDriver } = require("../../../config/helpers/editInfoDriver");

const editDetailState = structure(async (req, res) => {
  const { id, detailstate } = matchedData(req);
  const foundDetailState = await findDetailState(detailstate);
  let requestService = await RequestService.aggregate([
    {
      $lookup: {
        from: GlobalState.collection.name,
        localField: "globalState",
        foreignField: "_id",
        as: "globalState",
      },
    },
    {
      $lookup: {
        from: DetailState.collection.name,
        localField: "detailState._id",
        foreignField: "_id",
        as: "detailState",
      },
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
  ]);
  requestService = requestService[0];
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
  if(detailstate == 'pendiente_recojo'){
      if(requestService.detail.driverUser){
          const service = await getService()
          emitServiceToDriver(req.user.id,service)
          return handleError(res, 400, "El servicio ya ha sido asignado.")
      }
      requestService.detail.driverUser = req.user._id
      clientService.get("infoDriver", function(err, reply){
        const infoDriver = editInfoDriver(reply, {id:req.user._id, isAvaliable:false})
        console.log("Actualizando estado del conductor", infoDriver)
        clientService.set("infoDriver", infoDriver)
      });
    }
  requestService.detailState.push({ _id: foundDetailState._id });
  await requestService.save();
  emitToUpdateService(
    requestService.detail.driverUser,
    requestService._id,
    requestService
  );
  res
    .status(200)
    .json(objSuccess({}, "El estado Detalle se actualizó correctamente"));
});
module.exports = { editDetailState };
