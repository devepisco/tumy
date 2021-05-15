const ServiceModel =  require('../../../models/NewServices')

const findGlobalState = async (nameId = "") =>{
    const GlobalState = await ServiceModel.EstadoGlobal.findOne({
        nameId
    })
    .lean()
    .select("_id")
    .select("nameEstado")
  return GlobalState;
}

module.exports = { findGlobalState }