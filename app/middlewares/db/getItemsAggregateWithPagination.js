const { listInitOptions } = require("./listInitOptions");
const { cleanQuery } = require("../../middlewares/utils");
const getItemsAggregateWithPagination = async (
  header = {},
  query = {},
  model = {}
) => {
  const _query = cleanQuery(query);
  const options = listInitOptions(header);
  const modelAggregate = model.aggregate(_query);
  return await model.aggregatePaginate(modelAggregate, options);
};

module.exports = { getItemsAggregateWithPagination };
