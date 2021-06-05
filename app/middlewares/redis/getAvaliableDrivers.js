const { clientService } = require('../../../config/redis');

const getAvaliableDrivers = () => {
    //obtener drivers disponibles
    let drivers = clientService.get("infoDriver",function(err,reply){
        const array = JSON.parse(reply)
        return(JSON.parse(reply))
    })
    console.log(drivers)
    return drivers
}
module.exports = { getAvaliableDrivers }