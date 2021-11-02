const { editInfoDriver } = require("./editInfoDriver");
const { finishServiceDriver } = require("./finishServiceDriver");
const { checkCurrentOrders } = require("./checkCurrentOrders");

module.exports = [editInfoDriver, finishServiceDriver, checkCurrentOrders];
