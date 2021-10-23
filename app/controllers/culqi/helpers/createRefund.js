const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
  refundData = {
    chargeId: "",
    costo: "",
    reason: "",
  },
}) => {
  console.log("refundData: ",refundData);
  const refund = await culqi.refunds.createRefund({
    amount: `${refundData.costo}`*100, // monto calculado en céntimos
    charge_id: refundData.chargeId,
    reason: refundData.reason,
  });
  return refund
};
module.exports = { createRefund };
