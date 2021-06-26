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
};
