const { getItemsWithPagination, getItemByQuery } = require("../../../middlewares/db");
const { RequestService } = require("../../../models/NewServices");
const { maxReachDriver } = require("../../../models/maxReachDriver");
const { distanceMatrix } = require("../../../middlewares/googlemapsapi/distanceMatrix");
const { findGlobalState } = require("../../../controllers/users/helpers");
const { clientService } = require("../../../../config/redis")

const getService = async ( driver, page = 1 ) => {  
    const globalState = await findGlobalState("en_proceso");
    const service = await getItemsWithPagination({page:page, limit:1},{globalState: globalState._id},RequestService,'detailState._id');
    const originService = service.docs[0].origin.coordinates;
    let distanceServiceDriver = await distanceMatrix(driver.coordinates, originService);
    distanceServiceDriver = parseFloat(distanceServiceDriver.rows[0].elements[0].distance.text)
    const maxReach = await getItemByQuery({}, maxReachDriver);
    if(distanceServiceDriver <= maxReach.number) {
      await RequestService.findByIdAndUpdate(service.docs[0]._id,{'detail.driverUser':driver.id})
      return service.docs[0];
    }
    else {
      if(page < service.totalDocs) return getService(location, service.page + 1 )
      else false
    }
}
module.exports = { getService } 