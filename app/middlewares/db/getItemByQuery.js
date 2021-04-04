const getItemByQuery = async (
    query = {}, 
    model = {}, 
    populate = []
 ) => {
   const item = await model.findOne(query).lean().populate(populate)
   return item
}

module.exports = { getItemByQuery }
