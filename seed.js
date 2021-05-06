const User = require("./app/models/User"),
  usersData = require("./data/users/users");
const PriceRate = require("./app/models/PriceRate"),
  pricerateData = require("./data/pricerates/pricerates");

const seedDB = async () => {
  const usersCount = await User.countDocuments();
  if (usersCount < 2) {
    const usersPromises = usersData.map(async (user) => {
      return new User(user).save();
    });

    const promises = await Promise.all(usersPromises);
    console.log(promises);
  }
  const pricerateCount = await PriceRate.countDocuments();
  if (pricerateCount < 2) {
    const priceratesPromises = pricerateData.map(async (user) => {
      return new PriceRate(user).save();
    });

    const promises = await Promise.all(priceratesPromises);
    console.log(promises);
  }
};

module.exports = { seedDB };
