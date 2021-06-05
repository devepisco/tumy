const {getAvaliableDrivers} = require("../../../middlewares/redis")
const { distanceMatrix } = require("../../../middlewares/googlemapsapi/distanceMatrix");
const { RequestService } = require("../../../models/NewServices");
const { emitToUpdateService } = require("../../../middlewares/sockets");
const { clientService } = require("../../../../config/redis");

const asignDriverToService = async (service) =>  {
    //let drivers = getAvaliableDrivers();
    clientService.get("infoDriver")
    let nearestDriver;
    for (driver in drivers) {
        if(drivers[driver].isAvaliable == true) {
            const distance = await distanceMatrix(driver[driver].coordinates, service.origin.coordinates)
            if(!nearestDriver) nearestDriver = { id: drivers[driver].id, distance: distance.rows[0].elements[0].distance.value }
            else if(distance.rows[0].elements[0].distance.value < nearestDriver.distance){
                nearestDriver = {id: drivers[driver].id, distance: distance}
            }
        }
    }

    //Actualizar DriverUser = driver._id
    console.log(nearestDriver)
    const requestService = await RequestService.findByIdAndUpdate(service._id,{'detail.driverUser' : nearestDriver.id})
    emitToUpdateService(nearestDriver.id,service._id,service)
    return requestService;
}
module.exports = { asignDriverToService }