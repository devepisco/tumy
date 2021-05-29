const { GlobalState } =  require('../../../models/NewServices')

const findGlobalState = async (IdName = "") =>{
    const FoundGlobalState = await GlobalState.findOne({
        IdName
    })
    .lean()
    .select("_id")
    .select("stateName")
  return FoundGlobalState;
}

module.exports = { findGlobalState }