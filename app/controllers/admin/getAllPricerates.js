const { structure, objSuccess } = require("../../middlewares/utils");
const PriceRate = require("../../models/PriceRate")

const getAllPricerates = structure(async (req, res) => {
    const pricerates = await PriceRate.find()
    res.status(200).json(objSuccess(pricerates))
});
module.exports = { getAllPricerates };
