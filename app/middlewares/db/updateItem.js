const updateItem = async (
  id = "",
  data = {},
  model = {},
  populate = []
) => {
  const updatedItem = await model
    .findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    )
    .populate(populate);
  return updatedItem;
};

module.exports = { updateItem };
