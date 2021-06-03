const { emitTo } = require("./helpers")

const emitToUpdateService = (idDriver, idService, data) => {
    emitTo(`${idDriver}`, "driver:service", data )
    //console.log(idDriver, idService)
    emitTo(`${idService}`, "client:getDetailService", data)
    //console.log("Emit Service:",emit)
}

module.exports = { emitToUpdateService }