const User = require("./app/models/User"),
  usersData = require("./data/users/users");
const Driver = require("./app/models/Driver"),
  driversData = require("./data/drivers/drivers");
const PriceRate = require("./app/models/PriceRate"),
  pricerateData = require("./data/pricerates/pricerates");
const ServiceModel = require("./app/models/NewServices"),
  paymentMethodData = require("./data/paymentMethods/paymentMethods"),
  estadoDetalleData = require("./data/detailStates/detailstates"),
  estadoGlobalData = require("./data/globalStates/globalstates");


const seedDB = async () => {
  //Usuarios
  const usersCount = await User.User.countDocuments();
  if (usersCount < 2) {
    const usersPromises = usersData.map(async (user) => {
      return new User.User(user).save();
    });

    const promises = await Promise.all(usersPromises);
    console.log(promises);
  }
  //Repartidores
  const driversCount = await Driver.countDocuments();
  if (driversCount < 2) {
    const driversPromises = driversData.map(async (driver) => {
      return new Driver(driver).save();
    });

    const promises = await Promise.all(driversPromises);
    console.log(promises);
  }
  //Tarifas
  const pricerateCount = await PriceRate.countDocuments();
  if (pricerateCount < 1) {
    const priceratesPromises = pricerateData.map(async (pricerate) => {
      return new PriceRate(pricerate).save();
    });

    const promises = await Promise.all(priceratesPromises);
    console.log(promises);
  }
  //Métodos de pago
  const paymentMethodCount = await ServiceModel.PagoContraEntrega.countDocuments();
  if (paymentMethodCount < 1) {
    const paymentMethodPromises = paymentMethodData.map(async (paymentMethod) => {
      return new ServiceModel.PagoContraEntrega(paymentMethod).save();
    });
    const promises = await Promise.all(paymentMethodPromises);
    console.log(promises);
  }
  //Estados Detalle
  const estadoDetalleCount = await ServiceModel.EstadoDetalle.countDocuments();
  if (estadoDetalleCount < 1) {
    const estadoDetallePromises = estadoDetalleData.map(async (estadoDetalle) => {
      return new ServiceModel.EstadoDetalle(estadoDetalle).save();
    });
    const promises = await Promise.all(estadoDetallePromises);
    console.log(promises);
  }
  //Estados Globales
  const estadoGlobalCount = await ServiceModel.EstadoGlobal.countDocuments();
  if (estadoGlobalCount < 1) {
    const estadoGlobalPromises = estadoGlobalData.map(async (estadoGlobal) => {
      return new ServiceModel.EstadoGlobal(estadoGlobal).save();
    });
    const promises = await Promise.all(estadoGlobalPromises);
    console.log(promises);
  }
};

module.exports = { seedDB };
