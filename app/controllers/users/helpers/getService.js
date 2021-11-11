const {
  RequestService,
  GlobalState,
  DetailState,
} = require("../../../models/NewServices");
const {
  findDetailState,
} = require("../../../controllers/users/helpers/findDetailState");

const getService = async () => {
  const detailStateModel = await findDetailState("servicio_creado");
  const service = await RequestService.aggregate([
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
    { $addFields: { lastDetailState: { $last: "$detailState" } } },
    {
      $project: {
        _id: 1,
        origin: 1,
        destination: 1,
        detail: 1,
        globalState: 1,
        costo: 1,
        tiempoAprox: 1,
        detailState: 1,
        lastDetailState: 1,
      },
    },
    {
      $match: {
        $and: [{ lastDetailState: detailStateModel._id }],
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
    {
      $limit: 1,
    },
  ]);
  if (service.length < 1) return false;
  else return service;
};
module.exports = { getService };
