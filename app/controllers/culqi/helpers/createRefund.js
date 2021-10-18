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
    amount: `${refundData.costo}`.replace(".", ""), // monto calculado en céntimos
    charge_id: refundData.chargeId,
    reason: refundData.reason,
  });
  console.log(refund);
};
module.exports = { createRefund };
