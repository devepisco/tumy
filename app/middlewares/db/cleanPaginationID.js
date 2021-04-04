const cleanPaginationID = (result = {}) => {
  result.docs.map((element) => delete element.id)
  return result
}

module.exports = { cleanPaginationID }
