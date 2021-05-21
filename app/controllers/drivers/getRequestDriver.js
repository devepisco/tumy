const { getItemsWithPagination } = require("../../middlewares/db/getItemsWithPagination");
const { structure } = require("../../middlewares/utils");
const Driver = require("../../models/Driver")

const getRequestDriver = structure(async (req, res) => {
    const drivers = await getItemsWithPagination(req.query, {status: "Pendiente"}, Driver)
    return res.status(200).json(drivers)
})

module.exports = { getRequestDriver }