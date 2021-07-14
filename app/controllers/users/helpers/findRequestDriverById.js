const RequestDriver = require("../../../models/DriverRequests");

const findRequestDriverById = async (_id = "") => {
  const requestDriver = await RequestDriver.findById(_id)
    .lean()
    return requestDriver;
};

module.exports = { findRequestDriverById };
