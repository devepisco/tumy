const { matchedData } = require("express-validator");
const { objSuccess } = require("../../middlewares/utils");
const PriceRate = require("../../models/PriceRate");

const addPriceRate = async (req,res) =>{
    const data = matchedData(req);
    const newPriceRate = new PriceRate(data);
    await newPriceRate.save();
    res.status(200).json(objSuccess(newPriceRate,"La nueva tarifa se agregó correctamente"));
}
module.exports = {addPriceRate}