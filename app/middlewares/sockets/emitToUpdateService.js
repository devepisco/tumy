const { emitTo } = require("./helpers")

const emitToUpdateService = (idDriver, idService, data) => {
    const emitToDriver = emitTo(`${idDriver}`, "driver:service", data )
    console.log("aaaaa", idDriver, idService)
    console.log("emitToDriver", emitToDriver)
    emitTo(`${idService}`, "client:getDetailService", data)
    //console.log("Emit Service:",emit)
}

module.exports = { emitToUpdateService }