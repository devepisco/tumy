const { DetailState } =  require('../../../models/NewServices')

const findDetailState = async (IdName = "") =>{
    const FoundDetailState = await DetailState.findOne({
        IdName
    })
    .lean()
    .select("_id")
    .select("stateName")
  return FoundDetailState;
}

module.exports = { findDetailState }