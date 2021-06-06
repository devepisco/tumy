const { structure } = require("../../middlewares/utils");
const { createNewPreference } = require("./helpers");

const createPreference = structure(async (req, res) => {
  const { item, payer } = req.body;
  const PREFERENCE = await createNewPreference(item, payer);
  return res.status(201).json(PREFERENCE);
});

module.exports = { createPreference };
