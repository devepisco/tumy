const { RequestService, Comissions } = require("../../models/NewServices");
const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { findDetailState, findGlobalState } = require("../users/helpers");
const { matchedData } = require("express-validator");
const { createRefund } = require("../culqi/helpers/createRefund");

const cancelService = structure(async (req, res) => {
  //const { reason } = matchedData(req);
  const reason = "solicitud_comprador";
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

  foundService.detailState.push({
    _id: estadoDetalle._id,
    obs: reason,
  });

  const globalState = await findGlobalState("cancelado");

  const updatedEstadoGlobal = await RequestService.findByIdAndUpdate(
    IdServicio,
    { globalState: globalState._id },
    {
      new: true,
    }
  );

  if (
    updatedEstadoGlobal.globalState.toString() == globalState._id.toString() && foundService.hasPaid
  ) {
    let newBalance = 1; // Indica la devolución total
    if (foundService.detail.DriverUser) {
      /* Se asigna el valor de la comisión */
      const comission = await Comissions.findOne({ _id: foundService._id });
      const amount = comission.amount * foundService.costo;
      foundService.detail.comission.amount = `${amount.toFixed(2)}`;
      /** Devolución parcial */
      newBalance -= comission.amount; // Descuento por el porcentaje de la comision del driver
    }
    await createRefund(foundService, newBalance, reason);
    await foundService.save();
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
