const { User } = require("./app/models/User"),
  usersData = require("./data/users/users");
const RequestDriver = require("./app/models/Driver"),
  driversData = require("./data/drivers/drivers");
const PriceRate = require("./app/models/PriceRate"),
  pricerateData = require("./data/pricerates/pricerates");
const { PaymentMethod, DetailState, GlobalState }  = require("./app/models/NewServices"),
  paymentMethodData = require("./data/paymentMethods/paymentMethods"),
  estadoDetalleData = require("./data/detailStates/detailstates"),
  globalStateData = require("./data/globalStates/globalstates");
const {maxReachDriver} = require("./app/models/maxReachDriver"),
  maxReachDriverData = require("./data/maxReachDriver/maxReachDriver")


const seedDB = async () => {
  //Users
  const usersCount = await User.countDocuments();
  if (usersCount <2) {
    const usersPromises = usersData.map(async (user) => {
      return new User(user).save();
    });

    const promises = await Promise.all(usersPromises);
    console.log(promises);
  }
  //Drivers
  const driversCount = await RequestDriver.countDocuments();
  if (driversCount < 2) {
    const driversPromises = driversData.map(async (driver) => {
      return new RequestDriver(driver).save();
    });

    const promises = await Promise.all(driversPromises);
    console.log(promises);
  }
  //Price rates
  const pricerateCount = await PriceRate.countDocuments();
  if (pricerateCount < 1) {
    const priceratesPromises = pricerateData.map(async (pricerate) => {
      return new PriceRate(pricerate).save();
    });

    const promises = await Promise.all(priceratesPromises);
    console.log(promises);
  }
  //Payment Methods
  const paymentMethodCount = await PaymentMethod.countDocuments();
  if (paymentMethodCount < 1) {
    const paymentMethodPromises = paymentMethodData.map(async (paymentMethod) => {
      return new PaymentMethod(paymentMethod).save();
    });
    const promises = await Promise.all(paymentMethodPromises);
    console.log(promises);
  }
  //Detail States
  const estadoDetalleCount = await DetailState.countDocuments();
  if (estadoDetalleCount < 6) {
    const estadoDetallePromises = estadoDetalleData.map(async (estadoDetalle) => {
      return new DetailState(estadoDetalle).save();
    });
    const promises = await Promise.all(estadoDetallePromises);
    console.log(promises);
  }
  //Global States
  const globalStateCount = await GlobalState.countDocuments();
  if (globalStateCount < 3) {
    const globalStatePromises = globalStateData.map(async (globalState) => {
      return new GlobalState(globalState).save();
    });
    const promises = await Promise.all(globalStatePromises);
    console.log(promises);
  }
  //maxReachDriver
  const maxReachDriverCount = await maxReachDriver.countDocuments();
  if (maxReachDriverCount < 1) {
    const maxReachDriverPromises = maxReachDriverData.map(async (data) => {
      return new maxReachDriver(data).save();
    });
    const promises = await Promise.all(maxReachDriverPromises);
    console.log(promises);
  }
};

module.exports = { seedDB };
