const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
  refundData = {
    chargeId: "",
    amount: "",
    reason: "",
  },
}) => {
  console.log("refund Data:",refundData);
  const refund = await culqi.refunds.createRefund({
    amount: refundData.amount, // monto calculado en céntimos
    charge_id: refundData.chargeId,
    reason: refundData.reason,
  });
  console.log(refundData);
  return refund
};
module.exports = { createRefund };
