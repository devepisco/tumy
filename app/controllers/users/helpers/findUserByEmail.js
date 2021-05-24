const { User } = require("../../../models/User");

const findUserByEmail = async (email = "") => {
  const user = await User.findOne({
    email,
  })
    .lean()
    .select("+password")
    .populate("business");
  return user;
};

module.exports = { findUserByEmail };
