const navigation = require("../../../../data/navigations/navigation");

// ejecutar y pasar el nombre del rol
const getNavigationByRole = (role = "") => {
  const nav = navigation.filter((n) => {
    if (n.roles.includes(role)) {
      return n;
    }
  });

  return nav;
};

module.exports = { getNavigationByRole };
