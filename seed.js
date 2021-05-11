const User = require("./app/models/User"),
  usersData = require("./data/users/users");
const PriceRate = require("./app/models/PriceRate"),
  pricerateData = require("./data/pricerates/pricerates");
const PaymentMethod = require("./app/models/NewServices"),
  paymentMethodData = require("./data/paymentMethods/paymentMethods");

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
  if (pricerateCount < 1) {
    const priceratesPromises = pricerateData.map(async (pricerate) => {
      return new PriceRate(pricerate).save();
    });

    const promises = await Promise.all(priceratesPromises);
    console.log(promises);
  }
  const paymentMethodCount = await PaymentMethod.PagoContraEntrega.countDocuments();
  if (paymentMethodCount < 1) {
    const paymentMethodPromises = paymentMethodData.map(async (paymentMethod) => {
      return new PaymentMethod.PagoContraEntrega(paymentMethod).save();
    });
    const promises = await Promise.all(paymentMethodPromises);
    console.log(promises);
  }
};

module.exports = { seedDB };
