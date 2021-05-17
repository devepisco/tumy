const ServiceModel =  require('../../../models/NewServices')

const findDetailState = async (nameId = "") =>{
    const DetailState = await ServiceModel.EstadoDetalle.findOne({
        nameId
    })
    .lean()
    .select("_id")
    .select("nameEstado")
  return DetailState;
}

module.exports = { findDetailState }