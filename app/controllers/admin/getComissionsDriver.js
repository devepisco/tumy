const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils");
const { RequestService, GlobalState } = require("../../models/NewServices");
const mongoose = require("mongoose");
const getComissionsDriver = structure(async (req, res) => {
  let { id, globalState, beginDate, endDate } = matchedData(req);
  let data;
  if (!id) id = req.user._id;
  // si se ingresan los 3 filtros de busqueda o solo 1 fecha y estado global
  if (
    (beginDate && endDate && globalState) ||
    (beginDate && !endDate && globalState)
  ) {
    if (!endDate) endDate = new Date(beginDate).valueOf() + 24 * 60 * 60000;
    else endDate = new Date(endDate).valueOf() + 24 * 60 * 60000;
    data = await RequestService.aggregate([
      {
        $lookup: { 
          from: GlobalState.collection.name,
          localField: "globalState",
          foreignField: "_id",
          as: "GlobalState",
        },
      },
      {
        $unwind: "$GlobalState",
      },
      {
        $unwind: "$detail.comission.amount",
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(beginDate),
            $lt: new Date(endDate),
          },
          "detail.driverUser": mongoose.Types.ObjectId(id),
          "GlobalState.IdName": globalState,
        },
      },
      {
        $project: {
          "origin.address": 1,
          "destination.address": 1,
          "detail.comission.amount": 1,
          "GlobalState.stateName":1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      }
    ]);
    // si se ingresan solo las fechas o solo una fecha
  } else if (
    (beginDate && endDate && !globalState) ||
    (beginDate && !globalState && !endDate)
  ) {
    if (!endDate) endDate = new Date(beginDate).valueOf() + 24 * 60 * 60000;
    else endDate = new Date(endDate).valueOf() + 24 * 60 * 60000;
    data = await RequestService.aggregate([
      {
        $lookup: {
          from: GlobalState.collection.name,
          localField: "globalState",
          foreignField: "_id",
          as: "GlobalState",
        },
      },
      {
        $unwind: "$GlobalState",
      },
      {
        $unwind: "$detail.comission.amount",
      },
      {
        $match: {
          createdAt: {
            $gte: new Date(beginDate),
            $lte: new Date(endDate),
          },
          "detail.driverUser": mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          "origin.address": 1,
          "destination.address": 1,
          "detail.comission.amount": 1,
          "GlobalState.stateName":1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    // si se ingresa solo el estado global
  } else if (globalState && !beginDate && !endDate) {
    data = await RequestService.aggregate([
      {
        $lookup: {
          from: GlobalState.collection.name,
          localField: "globalState",
          foreignField: "_id",
          as: "GlobalState",
        },
      },
      {
        $unwind: "$GlobalState",
      },
      {
        $unwind: "$detail.comission.amount",
      },
      {
        $match: {
            "GlobalState.IdName": globalState,
            "detail.driverUser": mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          "origin.address": 1,
          "destination.address": 1,
          "detail.comission.amount": 1,
          "GlobalState.stateName":1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    // si no mandas nada o cualquier otro parametro
  } else if (!beginDate && !endDate && !globalState) {
    console.log("Se realizó una consulta sin filtros");
    data = await RequestService.aggregate([
      {
        $lookup: {
          from: GlobalState.collection.name,
          localField: "globalState",
          foreignField: "_id",
          as: "GlobalState",
        },
      },
      {
        $unwind: "$GlobalState",
      },
      {
        $unwind: "$detail.comission.amount",
      },
      {
        $match: {
            "detail.driverUser": mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          "origin.address": 1,
          "destination.address": 1,
          "detail.comission.amount": 1,
          "GlobalState.stateName":1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
  }
  res.status(200).json(objSuccess(data));
});
module.exports = { getComissionsDriver };
