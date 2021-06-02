const { getService } = require("./getService");
const { getDetailFromId } = require("./getDetailFromId")
const { emitToUpdateService } = require("./emitToUpdateService")

module.exports = {
  getService,
  getDetailFromId,
  emitToUpdateService
};
