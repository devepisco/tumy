const { emitTo } = require("./helpers")

const emitToUpdateService = (idDriver, idService, dataForClient, dataForDriver) => {
    emitTo(`${idDriver}`, "driver:service", dataForDriver )
    emitTo(`${idService}`, "client:getDetailService", dataForClient)
}

module.exports = { emitToUpdateService }