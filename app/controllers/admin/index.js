const { getAllUsers } = require("./getAllUsers");
const { getUserDetail } = require("./getUserDetail");
const { insertDetailState } = require("./insertDetailState");
const { getAllDetailStates } = require("./getAllDetailStates");
const { blockUser } = require("./blockUser");

module.exports = {
  getAllUsers,
  getUserDetail,
  insertDetailState,
  getAllDetailStates,
  blockUser
};
