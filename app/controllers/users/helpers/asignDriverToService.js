const {
  distanceMatrix,
} = require("../../../middlewares/googlemapsapi/distanceMatrix");
const { RequestService,DetailState, GlobalState} = require("../../../models/NewServices");
const { emitToUpdateService } = require("../../../middlewares/sockets");
const { clientService } = require("../../../../config/redis");

const asignDriverToService = (service) => {
  clientService.get("infoDriver", async function (err, reply) {
    let countAvaliableDrivers = 0;
    let nearestDriver = {};
    const drivers = JSON.parse(reply);
    for (driver in drivers) {
      if (drivers[driver].isAvaliable) {
        countAvaliableDrivers += 1;
        const distance = await distanceMatrix(
          drivers[driver].coordinates,
          service.origin.coordinates
        );
        if (Object.keys(nearestDriver).length === 0){
          nearestDriver = {
            id: drivers[driver].id,
            distance: distance.rows[0].elements[0].distance.value,
          };
        } else if (
          distance.rows[0].elements[0].distance.value < nearestDriver.distance
        ) {
          nearestDriver = { id: drivers[driver].id, distance: distance.rows[0].elements[0].distance.value };
        }
      }
    }
    if(countAvaliableDrivers >= 1){
        await RequestService.findByIdAndUpdate(service._id, {
          "detail.driverUser": nearestDriver.id,
        },{new:true});
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
              _id: service._id,
            },
          },
          {
            $project: {
              "globalState._id":0,
              "globalState.IdName":0,
              "globalState.__v":0,
              "detailState._id":0,
              "detailState.IdName":0,
              "detailState.__v":0,
            }
          },
        ]);
        emitToUpdateService(nearestDriver.id, service._id, data);
      }
  });
};
module.exports = { asignDriverToService };
