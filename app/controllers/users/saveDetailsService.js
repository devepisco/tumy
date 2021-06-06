const {
  structure,
  handleError,
  objSuccess,
  isIDGood,
} = require("../../middlewares/utils");
const {
  findPaymentMethod,
  findDetailState,
  findGlobalState,
  asignDriverToService,
} = require("../users/helpers");
const {
  RequestService,
  GlobalState,
  DetailState,
} = require("../../models/NewServices");
const { ConnectionStates } = require("mongoose");

const saveDetailsService = structure(async (req, res) => {
  idService = isIDGood(req.body.idServicio);
  const IdNamePago = await findPaymentMethod(req.body.nameIdPago);
  console.log(req.user)
  const foundService = await RequestService.findOne({ _id: idService }).lean();
  if (!foundService)
    return handleError(res, 404, "No se encontró la solicitud de servicio");
  if (foundService.detail && Object.keys(foundService.detail).length !== 0) {
    return handleError(
      res,
      404,
      "El servicio ya contiene un detalle existente"
    );
  }
  let detail = {
    descripcion: req.body.descripcion,
    nombreRemitente: req.body.nombreRemitente,
    celularRemitente: req.body.celularRemitente,
    nombreDestinatario: req.body.nombreDestinatario,
    celularDestinatario: req.body.celularDestinatario,
    esDestinatario: req.body.esDestinatario == "true",
    repartidorCobra: req.body.repartidorCobra == "true",
    pagoContraEntrega: IdNamePago._id,
    montoContraEntrega: req.body.montoContraEntrega,
  };
  if (!detail.esDestinatario) {
    detail.nombreDestinatario = `${req.user.firstname} ${req.user.lastname}`;
    detail.celularDestinatario = req.user.phone;
  } else {
    detail.nombreRemitente = `${req.user.firstname} ${req.user.lastname}`;
    detail.celularRemitente = req.user.phone;
  }

  const detailState = await findDetailState("servicio_creado");
  const globalState = await findGlobalState("en_proceso");

  let updatedService = await RequestService.findByIdAndUpdate(
    foundService._id,
    {
      detail,
      globalState: globalState._id,
    },
    { new: true }
  );

  /*   if (req.body.esDestinatario == "true") {
    if (req.body.repartidorCobra == "true") {
      updatedService = await RequestService.findByIdAndUpdate(
        foundService._id,
        {
          detail: {
            descripcion: req.body.descripcion,
            nombreRemitente: req.body.nombreRemitente,
            celularRemitente: req.body.celularRemitente,
            nombreDestinatario: req.body.nombreDestinatario,
            celularDestinatario: req.body.celularDestinatario,
            esDestinatario: false,
            repartidorCobra: true,
            pagoContraEntrega: IdNamePago._id,
            montoContraEntrega: req.body.montoContraEntrega,
          },
          globalState: globalState._id,
        },
        { new: true }
      );
    } else {
      updatedService = await RequestService.findByIdAndUpdate(
        foundService._id,
        {
          detail: {
            descripcion: req.body.descripcion,
            nombreRemitente: req.body.nombreRemitente,
            celularRemitente: req.body.celularRemitente,
            nombreDestinatario: req.body.nombreRemitente,
            celularDestinatario: req.body.celularRemitente,
            esDestinatario: true,
            repartidorCobra: false,
            pagoContraEntrega: IdNamePago._id,
            montoContraEntrega: foundService.costo,
          },
          globalState: globalState._id,
        },
        { new: true }
      );
    }
  } else {
    if (req.body.repartidorCobra == "true") {
      updatedService = await RequestService.findByIdAndUpdate(
        foundService._id,
        {
          detail: {
            descripcion: req.body.descripcion,
            nombreRemitente: req.body.nombreRemitente,
            celularRemitente: req.body.celularRemitente,
            nombreDestinatario: req.body.nombreDestinatario,
            celularDestinatario: req.body.celularDestinatario,
            esDestinatario: false,
            repartidorCobra: true,
            pagoContraEntrega: IdNamePago._id,
            montoContraEntrega: req.body.montoContraEntrega,
          },
          globalState: globalState._id,
        },
        { new: true }
      );
    } else {
      updatedService = await RequestService.findByIdAndUpdate(
        foundService._id,
        {
          detail: {
            descripcion: req.body.descripcion,
            nombreRemitente: req.body.nombreRemitente,
            celularRemitente: req.body.celularRemitente,
            nombreDestinatario: req.body.nombreDestinatario,
            celularDestinatario: req.body.celularDestinatario,
            esDestinatario: false,
            repartidorCobra: false,
            pagoContraEntrega: IdNamePago._id,
            montoContraEntrega: req.body.montoContraEntrega,
          },
          globalState: globalState._id,
        },
        { new: true }
      );
    }
  } */
  updatedService.detailState = [
    {
      _id: detailState._id,
    },
  ];
  await updatedService.save();

  if (
    updatedService.detail &&
    updatedService.globalState &&
    updatedService.detailState
  ) {
    asignDriverToService(updatedService);
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
  } else {
    return handleError(
      res,
      500,
      "Hubo un error al guardar el estado del servicio"
    );
  }
});

module.exports = { saveDetailsService };
