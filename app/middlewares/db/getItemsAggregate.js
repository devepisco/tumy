const getItemsAggregate = async (query = [], model = {}) => {
    return await model.aggregate(query)
}

module.exports = { getItemsAggregate }