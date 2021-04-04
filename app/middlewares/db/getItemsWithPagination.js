const { listInitOptions } = require("./listInitOptions");
const { cleanPaginationID } = require("./cleanPaginationID");
const { cleanQuery } = require('../../middlewares/utils')

const getItemsWithPagination = async (
  header = {},
  query = {},
  model = {},
  populate = []
) => {
  const _query = cleanQuery(query)
  const options = listInitOptions(header, populate);
  return cleanPaginationID(await model.paginate(_query, options));
};

module.exports = { getItemsWithPagination };