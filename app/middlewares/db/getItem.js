const getItem = async (id = "", model = {}, populate = []) => {
  const item = await model.findById(id).lean().populate(populate);
  return item;
};

module.exports = { getItem };
