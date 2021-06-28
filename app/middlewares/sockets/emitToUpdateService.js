const { emitTo } = require("./helpers")

const emitToUpdateService = (idDriver, idService, data) => {
    console.log(idDriver)
    emitTo(`${idDriver}`, "driver:service", data )
    emitTo(`${idService}`, "client:getDetailService", data)
    //console.log("Emit Service:",emit)
}

module.exports = { emitToUpdateService }