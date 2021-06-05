const {
  distanceMatrix,
} = require("../../../middlewares/googlemapsapi/distanceMatrix");
const { RequestService } = require("../../../models/NewServices");
const { emitToUpdateService } = require("../../../middlewares/sockets");
const { clientService } = require("../../../../config/redis");

const asignDriverToService = async(service) => {
  let countAvaliableDrivers = 0;
  clientService.get("infoDriver", async function (err, reply) {
    let nearestDriver;
    drivers = JSON.parse(reply);
    for (driver in drivers) {
      if (drivers[driver].isAvaliable) {
        countAvaliableDrivers += 1;
        const distance = await distanceMatrix(
          drivers[driver].coordinates,
          service.origin.coordinates
        );
        if (!nearestDriver){
          nearestDriver = {
            id: drivers[driver].id,
            distance: distance.rows[0].elements[0].distance.value,
          };
        } else if (
          distance.rows[0].elements[0].distance.value < nearestDriver.distance
        ) {
          nearestDriver = { id: drivers[driver].id, distance: distance };
        }
      }
    }
  });
  if(countAvaliableDrivers < 1) return false;
  else{
      await RequestService.findByIdAndUpdate(service._id, {
        "detail.driverUser": nearestDriver.id,
      });
      emitToUpdateService(nearestDriver.id, service._id, service);
      return true;
  }
};
module.exports = { asignDriverToService };
