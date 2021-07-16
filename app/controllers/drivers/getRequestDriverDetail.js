const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils");
const RequestDriver = require("../../models/DriverRequests");

const getRequestDriverDetail = structure(async (req, res) => {
    const { id } =  matchedData(req);
    const request = await RequestDriver.findOne({_id:id},{password:0,__v:0});
    res.status(200).json(objSuccess(request));
});
module.exports = { getRequestDriverDetail };
