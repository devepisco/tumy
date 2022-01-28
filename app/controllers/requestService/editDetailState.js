const {
  structure,
  isIDGood,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { findDetailState, findGlobalState } = require("../users/helpers");
const { RequestService, Comissions } = require("../../models/NewServices");
const {
  emitToUpdateService,
  emitServiceToDriver,
} = require("../../middlewares/sockets");
const { matchedData } = require("express-validator");
const { getService } = require("../users/helpers");
const { clientService } = require("../../../config/redis");
const { editInfoDriver } = require("../../../config/helpers/editInfoDriver");
const {
  createNotifications,
} = require("../notifications/createSessionOneSignal");

const editDetailState = structure(async (req, res) => {
  const { id, detailstate } = matchedData(req);
  if (req.user.role != "driver" && !req.user.isBlocked)
    return handleError(
      res,
      400,
      "Acceso denegado para realizar esta solicitud."
    );
  const foundDetailState = await findDetailState(detailstate);
  const requestService = await RequestService.findById(id);

  let existDetailState =
    requestService.detailState[requestService.detailState.length - 1] ==
      `${foundDetailState._id}` ?? true;

  if (existDetailState)
    return handleError(
      res,
      400,
      "La solicitud de servicio ya se encuentra en estado: " +
        foundDetailState.stateName
    );

  const user_client = requestService.creatorUser;

  if (detailstate == "pendiente_recojo") {
    if (requestService.detail.driverUser) {
      const service = await getService();
      emitServiceToDriver(req.user._id, service);
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

    /**
     * @description coge el userId CREA LA NOTIFICACION
     * @var user_client IS A CLIENT ID
     */
    await createNotifications(
      user_client,
      "cambio de estado",
      "Tu pedido ha sido asignado a un Tummer",
      "Un motorizado está yendo a recoger tu pedido"
    );
  }
  if (detailstate == "entregado") {
    const foundGlobalState = await findGlobalState("entregado");
    requestService.globalState = foundGlobalState._id;
    if (req.files) {
      for (i in req.files.paymentCaptures) {
        requestService.captures.payment.push(
          req.files.paymentCaptures[i].filename
        );
      }
      for (i in req.files.serviceCaptures) {
        requestService.captures.service.push(
          req.files.serviceCaptures[i].filename
        );
      }
    }

    /**
     * @description coge el userId CREA LA NOTIFICACION
     * @var user_client IS A CLIENT ID
     */
    await createNotifications(
      user_client,
      "cambio de estado",
      "Tu pedido fue entregado",
      "Esperamos que estes contento con tu pedido!"
    );

    /* Se asigna el valor de la comisión */
    const comission = await Comissions.findOne({ isActive: true });
    const amount = comission.amount * requestService.costo;
    requestService.detail.comission.amount = `${amount.toFixed(2)}`;
  }

  if (detailstate == "recogido") {
    await createNotifications(
      user_client,
      "cambio de estado",
      "Tu pedido ha sido recogido",
      "Nuestro Tummer ha recogido tu pedido."
    );
  }
  if (detailstate == "reasignado") {
    await createNotifications(
      user_client,
      "cambio de estado",
      "Ocurrió algo inesperado",
      "Tu pedido ha sido reasignado, será atendido lo más pronto posible."
    );
  }
  requestService.detailState.push({ _id: foundDetailState._id });
  await requestService.save();

  const updatedService = await RequestService.findOne({ _id: id })
    .populate("detailState._id", { _id: 0, IdName: 0, __v: 0 })
    .populate("globalState", { _id: 0, IdName: 0, __v: 0 })
    .populate("detail.driverUser", { firstname: 1, lastname: 1 })
    .exec();
  let requestServiceToDriver = updatedService;
  //Si existe newOrigin significa que se trata de un pedido reasignado
  if (updatedService.newOrigin) {
    //reemplazamos origin por newOrigin (evitará modificar el front) y solo cambiará la vista del motorizado
    requestServiceToDriver.origin = updatedService.newOrigin;
    /**
     * @description coge el userId CREA LA NOTIFICACION
     * @var user_client IS A CLIENT ID
     */
    
  }
  
  emitToUpdateService(
    updatedService.detail.driverUser,
    updatedService._id,
    updatedService,
    requestServiceToDriver
  );
  res
    .status(200)
    .json(
      objSuccess(updatedService, "El estado Detalle se actualizó correctamente")
    );
});
module.exports = { editDetailState };
