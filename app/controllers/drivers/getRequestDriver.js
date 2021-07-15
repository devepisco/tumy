const { matchedData } = require("express-validator");
const { getItemsWithPagination } = require("../../middlewares/db");
const { structure, objSuccess } = require("../../middlewares/utils");
const RequestDriver = require("../../models/DriverRequests");

const getRequestDriver = structure(async (req, res) => {
  const { status } = matchedData(req);
  // const drivers = await getItemsWithPagination(
  //   req.query,
  //   { status: status},
  //   RequestDriver
  // )
  let drivers;
  if (status) drivers = await RequestDriver.find({ status }, { password: 0 });
  else drivers = await RequestDriver.find({}, { password: 0 });

  return res.status(200).json(objSuccess(drivers));
});

module.exports = { getRequestDriver };
