const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
  refundData = {
    chargeId: "",
    costo: "",
    reason: "",
  },
}) => {
  const refund = await culqi.refunds.createRefund({
    amount: refundData.costo, // monto calculado en céntimos
    charge_id: refundData.chargeId,
    reason: refundData.reason,
  });
  console.log(refundData);
  return refund
};
module.exports = { createRefund };
