const { culqi } = require("../../../../config/culqi");

const createRefund = async ({
    foundService = {}, 
    reason = "solicitud_comprador"
}) => {
    const a = await culqi.refunds.createRefund({
        amount: foundService.costo * 100,
        charge_id: foundService.chargeId,
        reason: reason
    });
    console.log(a);
    console.log('cancelado')
};
module.exports = { createRefund };
