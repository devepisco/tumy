const updateItemByQuery = async (
    query = {},
    data = {},
    model = {},
    populate = []
  ) => {
    const updatedItem = await model
      .updateOne(query, data, {
        new: true,
        runValidators: true,
      })
      .populate(populate);
    return updatedItem;
  };
  
  module.exports = { updateItemByQuery };
  