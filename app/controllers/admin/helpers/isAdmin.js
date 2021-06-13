const { findUserById } = require("../../../controllers/users/helpers")

const isAdmin = async (id) => {
  const user = await findUserById(id);
  if(user.role === "admin") return true;
  else return false
};

module.exports = { isAdmin };
