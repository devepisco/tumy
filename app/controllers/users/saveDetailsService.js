const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");

const {
  findPaymentMethod,
  findGlobalState,
  findDetailState,
} = require("../users/helpers");

const {
  RequestService,
  GlobalState,
  DetailState,
  Comissions,
} = require("../../models/NewServices");
const Notification = require("../../models/Notification");
const { matchedData } = require("express-validator");
const {
  createNotifications,
} = require("../notifications/createSessionOneSignal");

const saveDetailsService = structure(async (req, res) => {
  /* Validaciones */
  const {
    idServicio,
    descripcion,
    nombreRemitente,
    celularRemitente,
    nombreDestinatario,
    celularDestinatario,
    montoContraEntrega,
    nameIdPago,
  } = matchedData(req);
  const IdNamePago = await findPaymentMethod(nameIdPago);
  const foundService = await RequestService.findOne({ _id: idServicio }).lean();
  if (!foundService)
    return handleError(res, 404, "No se encontró la solicitud de servicio");
  if (foundService.detail && Object.keys(foundService.detail).length > 1) {
    // length > 1 , it always will have 1 key for the driverUser as null
    return handleError(
      res,
      404,
      "El servicio ya contiene un detalle existente"
    );
  }

  /* Se crea el detalle del servicio */
  let detail = {
    descripcion: descripcion,
    nombreRemitente: nombreRemitente,
    celularRemitente: celularRemitente && celularRemitente.replace("+51", ""),
    nombreDestinatario: nombreDestinatario,
    celularDestinatario:
      celularDestinatario && celularDestinatario.replace("+51", ""),
    esDestinatario: req.body.esDestinatario,
    repartidorCobra: req.body.repartidorCobra,
    pagoContraEntrega: IdNamePago._id,
    montoContraEntrega: montoContraEntrega,
    driverUser: null,
  };
  if (detail.esDestinatario) {
    detail.nombreDestinatario = `${req.user.firstname} ${req.user.lastname}`;
    detail.celularDestinatario = req.user.phone;
  } else {
    detail.nombreRemitente = `${req.user.firstname} ${req.user.lastname}`;
    detail.celularRemitente = req.user.phone;
  }

  /* Se añade el estado global */
  const globalState = await findGlobalState("en_proceso");
  const detailState = await findDetailState("servicio_creado");
  /* Se asigna Tipo de comision */
  const comissionId = await Comissions.findOne({ isActive: true });
  detail.comission = { _id: comissionId._id };

  let updatedService = await RequestService.findByIdAndUpdate(
    foundService._id,
    {
      detail,
      globalState: globalState._id,
      detailState: detailState,
    },
    { new: true }
  );

  /* Se pobla los datos */
  const data = await RequestService.aggregate([
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
        _id: updatedService._id,
      },
    },
    {
      $project: {
        "globalState._id": 0,
        "globalState.IdName": 0,
        "globalState.__v": 0,
        "detailState._id": 0,
        "detailState.IdName": 0,
        "detailState.__v": 0,
      },
    },
  ]);
  /** Buscar todos los drivers disponibles */
  const drivers = await Notification.find({}, { _id: 0 })
    .lean()
    .select("userId")
    .populate("userId", { firstname: 1, lastname: 1, isBlocked: 1 })
    .exec();

  /**
   * @description coge el userId CREA LA NOTIFICACION
   * @var user_client IS A CLIENT ID
   */
  drivers.forEach(async (driver) => {
    console.log(driver.userId._id);
    await createNotifications(
      driver.userId._id,
      "pedido disponible",
      "Hola Tummer " +
        driver.userId.firstname +
        ", hay un pedido disponible cerca de ti",
      "Revisa la app de TUMI delivery y te asignaremos un pedido."
    );
  });

  res.status(200).json(objSuccess(data, "Se actualizó de manera correcta"));
});

module.exports = { saveDetailsService };
