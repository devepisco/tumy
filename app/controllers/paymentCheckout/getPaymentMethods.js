const { structure } = require("../../middlewares/utils");
const { paymentsMethods } = require("./helpers");

const getPaymentMethods = structure(async (req, res) => {
  const { data } = await paymentsMethods();
  return res.status(200).json(data);
});

module.exports = { getPaymentMethods };
