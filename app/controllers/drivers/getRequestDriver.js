const { matchedData } = require("express-validator");
const { getItemsWithPagination } = require("../../middlewares/db");
const { structure } = require("../../middlewares/utils");
const RequestDriver = require("../../models/DriverRequests");

const getRequestDriver = structure(async (req, res) => {
  const { status } = matchedData(req);
  const drivers = await getItemsWithPagination(
    req.query,
    { status: status },
    RequestDriver
  );
  return res.status(200).json(drivers);
});

module.exports = { getRequestDriver };
