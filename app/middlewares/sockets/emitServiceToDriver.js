const { emitTo } = require("./helpers")

const emitServiceToDriver = (idDriver, data) => {
    emitTo(`${idDriver}`, "driver:service", data )
}

module.exports = { emitServiceToDriver }