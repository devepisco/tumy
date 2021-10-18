const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
  refundData = {
    chargeId: "",
    costo: "",
    newBalance: "",
    reason: "",
  },
}) => {
  const refund = await culqi.refunds.createRefund({
    amount: `${refundData.costo}` * `${refundData.newBalance}` * 100, // monto calculado en céntimos
    charge_id: refundData.chargeId,
    reason: refundData.reason,
  });
  console.log(refund);
};
module.exports = { createRefund };
