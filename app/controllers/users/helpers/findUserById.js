const { User } = require("../../../models/User");

const findUserById = async (_id = "") => {
  const user = await User.findById(_id)
    .lean()
    .populate("business")
  return user;
};

module.exports = { findUserById };
