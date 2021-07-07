const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
    foundService = {}, 
    reason = "solicitud_comprador"
}) => {
    await culqi.refunds.createRefund({
        amount: foundService.costo * 100,
        charge_id: foundService.chargeId,
        reason: reason
    });
};
module.exports = { createRefund };
