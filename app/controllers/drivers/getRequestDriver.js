const { getItemsWithPagination } = require("../../middlewares/db");
const { structure } = require("../../middlewares/utils");
const RequestDriver = require("../../models/Driver")

const getRequestDriver = structure(async (req, res) => {
    const drivers = await getItemsWithPagination(req.query, {}, RequestDriver)
    return res.status(200).json(drivers)
})

module.exports = { getRequestDriver }