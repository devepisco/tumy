const { matchedData } = require("express-validator");
const {
  structure,
  objSuccess,
  handleError,
} = require("../../middlewares/utils");
const { CanceledServices } = require("../../models/CanceledServices");
const {
  RequestService,
  Comissions,
  DetailState,
} = require("../../models/NewServices");
const { findDetailState, asignDriverToService } = require("../users/helpers");
const { searchAddressByCoordinates } = require("./helpers");

const ReassignService = async (foundService, reason) => {
  const foundDetailState1 = await findDetailState("reasignado");
  foundService.detailState.push({
    _id: foundDetailState1._id,
    obs: reason,
  });
  const foundDetailState2 = await findDetailState("servicio_creado");
  foundService.detailState.push({
    _id: foundDetailState2._id,
    obs: null,
  });
  foundService.detail.driverUser = null;
};

const AddCoordinates = async (coordinates) => {
  const newAddress = await searchAddressByCoordinates(coordinates);
  console.log("............NEW ADDRESS........  =>  ", newAddress);
  foundService.newOrigin = {
    coordinates: coordinates,
    address: newAddress,
  };
};
const driverCancelService = structure(async (req, res) => {
  const { id, whoseProblem, reason, resume, coordinates } = matchedData(req);
  const foundService = await RequestService.findById(id);
  if (!foundService)
    return handleError(res, 404, "No se encontró la solicitud de servicio");
  if (req.user._id != `${foundService.detail.driverUser}`)
    return handleError(
      res,
      404,
      "El Id de repartidor no coincide con el repartidor asignado."
    );
  let foundDetailState;
  if (whoseProblem == "driver") {
    // Definir el estado de detalle actual:
    const sizeDetailState = foundService.detailState.length;
    const lastDetailState = foundService.detailState[sizeDetailState - 1];
    const detailState = await DetailState.findById(lastDetailState._id);
    switch (detailState.IdName) {
      case "pendiente_recojo":
        await ReassignService(foundService, reason);
        break;
      case "recogido":
        await ReassignService(foundService, reason);
        await AddCoordinates(coordinates);
        break;
      case "proceso_entrega":
        await ReassignService(foundService, reason);
        await AddCoordinates(coordinates);
        break;
      default:
        break;
    }
  } else if (whoseProblem == "user") {
    foundDetailState = await findDetailState("entregado");
    //calcular comision
    const comission = await Comissions.findOne({ isActive: true });
    const amount = comission.amount * foundService.costo;
    foundService.detail.comission.amount = `${amount.toFixed(2)}`;
    foundService.detailState.push({
      _id: foundDetailState._id,
      obs: reason,
    });
  }
  let existDetailState =
    foundService.detailState[foundService.detailState.length - 1] ==
      `${foundDetailState._id}` ?? true;
  if (existDetailState) {
    return handleError(
      res,
      400,
      "La solicitud de servicio ya se encuentra en estado: " +
        foundDetailState.stateName
    );
  }

  const newCanceledService = new CanceledServices({
    creatorUser: req.user._id,
    whoseProblem: whoseProblem,
    resume: resume,
    coordinates: coordinates,
    service: id,
  });

  if (req.files) {
    for (i in req.files.cancelationCaptures) {
      newCanceledService.captures.push(
        req.files.cancelationCaptures[i].filename
      );
    }
  }
  await newCanceledService.save();
  await foundService.save();

  /* Reasignación de pedido a otro motorizado */
  asignDriverToService(foundService);

  res
    .status(200)
    .json(
      objSuccess({}, "El servicio fue correctamente reportado como cancelado")
    );
});
module.exports = { driverCancelService };
