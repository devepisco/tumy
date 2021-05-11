const { structure, handleError } = require("../../../middlewares/utils");
const Exceptions = require('../../../../errors/Exceptions');
const PaymentMethodTemplate =  require('../../../models/NewServices')

const findPaymentMethod = async (nameId = "") =>{
  if(!nameId){
      const PaymentMethod = await PaymentMethodTemplate.PagoContraEntrega.find()
    .lean()
    .select("nameId")
    .select("nameMethod")
  return PaymentMethod;
  }
    const PaymentMethod = await PaymentMethodTemplate.PagoContraEntrega.findOne({
        nameId
    })
    .lean()
    .select("_id")
    .select("nameMethod")
  return PaymentMethod;
}

module.exports = { findPaymentMethod }