const buildSort = (sort = '', order = 1) => {
  const sortBy = {}
  sortBy[sort] = order
  return sortBy
}

module.exports = { buildSort }
