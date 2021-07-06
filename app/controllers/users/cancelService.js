const { RequestService } = require("../../models/NewServices");
const { culqi } = require("../../../config/culqi");
const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { findDetailState, findGlobalState } = require("../users/helpers");
const { matchedData } = require("express-validator");

const cancelService = structure(async (req, res) => {
  const { reason } = matchedData(req);
  const foundService = await RequestService.findOne({ _id: req.params.id });
  if (!foundService)
    return handleError(res, 404, "No se encontró la solicitud de servicio");

  const IdServicio = req.params.id;
  const estadoDetalle = await findDetailState("cancelado");

  for (estado in foundService.detailState) {
    if (
      foundService.detailState[estado]._id.toString() ==
      estadoDetalle._id.toString()
    )
      return handleError(res, 404, "El servicio ya fue cancelado");
  }

  // if (foundService.detailState.length > 1)
  //   return handleError(
  //     res,
  //     404,
  //     "El servicio ya fue aceptado, no puede ser cancelado"
  //   );
  foundService.detailState.push({_id:estadoDetalle._id, obs: reason});
  await foundService.save();

  const globalState = await findGlobalState("cancelado");

  const dataGlobalState = { globalState: globalState._id };
  const updatedEstadoGlobal = await RequestService.findByIdAndUpdate(
    IdServicio,
    dataGlobalState,
    {
      new: true,
    }
  );

  if (
    updatedEstadoGlobal.globalState.toString() == globalState._id.toString()
  ) {
    /** Devolución de dinero : estado => servicio_creado*/
    if (foundService.hasPaid && foundService.detailState.length == 1) {
      culqi.refunds.createRefund({
        amount: foundService.costo * 100,
        charge_id: foundService.chargeId,
        reason: reason,
      });
    }

    res
      .status(200)
      .json(
        objSuccess(
          (data = {}),
          (message = "El servicio  " + IdServicio + " fue cancelado")
        )
      );
  }
});

module.exports = { cancelService };
