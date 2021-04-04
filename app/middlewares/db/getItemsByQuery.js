const getItemsByQuery = async (
    query = {}, 
    model = {}, 
    populate = [],
 ) => {
   const item = await model.find(query).lean().populate(populate)
   return item
}

module.exports = { getItemsByQuery }
