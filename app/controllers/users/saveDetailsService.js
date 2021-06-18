const {
  structure,
  handleError,
  objSuccess,
  isIDGood,
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
} = require("../../models/NewServices");
const { matchedData } = require("express-validator");

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
  const IdNamePago = await findPaymentMethod(req.body.nameIdPago);
  const foundService = await RequestService.findOne({ _id: idServicio }).lean();
  if (!foundService)
    return handleError(res, 404, "No se encontró la solicitud de servicio");
  if (foundService.detail && Object.keys(foundService.detail).length !== 0) {
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
    esDestinatario: req.body.esDestinatario == "true",
    repartidorCobra: req.body.repartidorCobra == "true",
    pagoContraEntrega: IdNamePago._id,
    montoContraEntrega: montoContraEntrega,
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

  let updatedService = await RequestService.findByIdAndUpdate(
    foundService._id,
    {
      detail,
      globalState: globalState._id,
      detailState: detailState,
    },
    { new: true }
  );

  /* Se crea preferencia en mercado pago */

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

  res.status(200).json(objSuccess(data, "Se actualizó de manera correcta"));
});

module.exports = { saveDetailsService };
