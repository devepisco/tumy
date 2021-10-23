const { getAllUsers } = require("./getAllUsers");
const { getUserDetail } = require("./getUserDetail");
const { insertDetailState } = require("./insertDetailState");
const { getAllDetailStates } = require("./getAllDetailStates");
const { blockUser } = require("./blockUser");
const { updateUsers } = require("./updateUsers");
const { getAllPricerates } = require("./getAllPricerates");
const { editPriceRate } = require("./editPriceRate");
const { addPriceRate } = require("./addPriceRate");
const { addComission } = require("./addComission");
const { getComissions } = require("./getComissions");
const { editComission } = require("./editComission");
const { getComissionsDriver } = require("./getComissionsDriver");
const { getAllServices } = require("./getAllServices");
const { editMaxReachService } = require("./editMaxReachService");
const { getMaxReachService } = require("./getMaxReachService");

module.exports = {
  getAllUsers,
  getUserDetail,
  insertDetailState,
  getAllDetailStates,
  blockUser,
  updateUsers,
  getAllPricerates,
  editPriceRate,
  addPriceRate,
  addComission,
  getComissions,
  editComission,
  getComissionsDriver,
  getAllServices,
  editMaxReachService,
  getMaxReachService,
};
