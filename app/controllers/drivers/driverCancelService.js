const { matchedData } = require("express-validator");
const {
  structure,
  objSuccess,
  handleError,
} = require("../../middlewares/utils");
const { CanceledServices } = require("../../models/CanceledServices");
const { RequestService, Comissions } = require("../../models/NewServices");
const { findDetailState, asignDriverToService } = require("../users/helpers");

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
    foundDetailState = await findDetailState("reasignado");
    //no calcular comision
  } else if (whoseProblem == "user") {
    foundDetailState = await findDetailState("entregado");
    //calcular comision
    const comission = await Comissions.findOne({ isActive: true });
    const amount = comission.amount * requestService.costo;
    foundService.detail.comission.amount = `${amount.toFixed(2)}`;
  }
  let existDetailState = foundService.detailState.find(
    (state) => state._id == `${foundDetailState._id}`
  );
  if (existDetailState) {
    return handleError(
      res,
      400,
      "La solicitud de servicio ya se encuentra en estado: " +
        foundDetailState.stateName
    );
  }

  foundService.detailState.push({
    _id: foundDetailState._id,
    obs: reason,
  });

  const newCanceledService = new CanceledServices({
    creatorUser: req.user._id,
    whoseProblem: whoseProblem,
    resume: resume,
    coordinates: coordinates,
    service: id,
  });

  /* Reasignación de pedido a otro motorizado */
  asignDriverToService(foundService);

  if (req.files) {
    for (i in req.files.cancelationCaptures) {
      newCanceledService.captures.push(
        req.files.cancelationCaptures[i].filename
      );
    }
  }
  await newCanceledService.save();
  await foundService.save();
  res
    .status(200)
    .json(
      objSuccess({}, "El servicio fue correctamente reportado como cancelado")
    );
});
module.exports = { driverCancelService };
