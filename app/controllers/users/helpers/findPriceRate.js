const PriceRate = require("../../../models/PriceRate");

const findPriceRate = async (IdName = "") => {
  const pricerate = await PriceRate.findOne({
    IdName
  })
    .lean()
    .select("price")
    .select("minPrice");
  return pricerate;
};

module.exports = { findPriceRate };
