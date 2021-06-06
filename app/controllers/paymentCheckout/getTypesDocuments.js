const { structure } = require("../../middlewares/utils");
const { typesDocuments } = require("./helpers");

const getTypesDocuments = structure(async (req, res) => {
  const { data } = await typesDocuments();
  return res.status(200).json(data);
});

module.exports = { getTypesDocuments }
