const { PaymentMethod } =  require('../../../models/NewServices')

const findPaymentMethod = async (IdName = "") =>{
  if(!IdName){
      const FoundPaymentMethod = await PaymentMethod.find()
    .lean()
    .select("IdName")
    .select("methodName")
  return FoundPaymentMethod;
  }
    const FoundPaymentMethod = await PaymentMethod.findOne({
        IdName
    })
    .lean()
    .select("_id")
    .select("methodName")
  return FoundPaymentMethod;
}

module.exports = { findPaymentMethod }