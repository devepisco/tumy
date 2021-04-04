const createItem = async (data = {}, model = {}) => {
  const savedItem = await model.create(data)
  return savedItem
}

module.exports = { createItem }
