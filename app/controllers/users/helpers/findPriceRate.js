const PriceRate = require("../../../models/PriceRate");

const findPriceRate = async (nameId = "") => {
  const pricerate = await PriceRate.findOne({
    nameId
  })
    .lean()
    .select("price")
    .select("minPrice");
  return pricerate;
};

module.exports = { findPriceRate };