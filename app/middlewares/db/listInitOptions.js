const { buildSort } = require("./buildSort");

const listInitOptions = (
  { order, sort, page, limit },
  populate = [],
) => {
  const _order = order || 1;
  const _sort = sort || "createdAt";
  const _sortBy = buildSort(_sort, _order);
  const _page = parseInt(page, 10) || 1;
  const _limit = parseInt(limit, 10) || 6;
  const options = {
    sort: _sortBy,
    lean: true,
    page: _page,
    limit: _limit,
  };
  if (populate.length > 0) options.populate = populate;
  return options;
};

module.exports = { listInitOptions };
