const { structure } = require("../../middlewares/utils");
const { findPaymentMethod } = require("../users/helpers/findPaymentMethod");

const getPaymentMethods = structure( async (req, res ) =>{
    const paymentMethods = await findPaymentMethod();
    res.json({
        paymentMethods
    })
});

module.exports = { getPaymentMethods }