const {
  RequestService,
  GlobalState,
  DetailState,
} = require("../../../models/NewServices");
const {
  findGlobalState,
} = require("../../../controllers/users/helpers/findGlobalState");

const getService = async () => {
  const globalStateCreated = await findGlobalState("en_proceso");
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
    { $addFields: { lastGlobalState: { $arrayElemAt: ["$globalState",0] } } },
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
        lastGlobalState: 1,
      },
    },
    {
      $match: {
        "lastGlobalState._id": globalStateCreated._id,
      },
    },
    {
      $match: {
        "detail.driverUser": null,
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
