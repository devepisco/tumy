const deleteItem = async (id = '', model = {}) => {
    const deletedItem = await model.deleteById(id)
    return deletedItem
}

module.exports = { deleteItem }
