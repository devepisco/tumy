const { matchedData } = require("express-validator");
const { objSuccess } = require("../../middlewares/utils");
const PriceRate = require("../../models/PriceRate");
const { findPriceRate } = require("../users/helpers");

const editPriceRate = async (req, res)=>{
    const data = matchedData(req)
    const foundPriceRate = await findPriceRate(req.params.IdName)
    let priceRate = await PriceRate.findByIdAndUpdate(foundPriceRate._id, data ,{new:true});
    res.status(200).json(objSuccess(priceRate, "La tarifa se editó correctamente."))
}
module.exports = {editPriceRate}