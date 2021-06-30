const { emitTo } = require("./helpers")

const emitToUpdateService = (idDriver, idService, data) => {
    emitTo(`${idDriver}`, "driver:service", data )
    emitTo(`${idService}`, "client:getDetailService", data)
}

module.exports = { emitToUpdateService }