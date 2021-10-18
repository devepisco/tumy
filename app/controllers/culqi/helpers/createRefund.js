const { culqi } = require("../../../../config/culqi");

const createRefund = async ({ foundService, newBalance, reason }) => {
  const refund = await culqi.refunds.createRefund({
    amount: foundService.costo * newBalance * 100,  // monto calculado en céntimos
    charge_id: foundService.chargeId,
    reason: reason,
  });
  console.log("cancelación del Pedido: ", foundService._id);
  console.log(refund);
};
module.exports = { createRefund };
