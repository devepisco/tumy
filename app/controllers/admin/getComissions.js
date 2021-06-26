const { objSuccess } = require("../../middlewares/utils");
const { Comissions } = require("../../models/NewServices");

const getComissions = async (req, res) => {
  const comissions = await Comissions.find();
  res.status(200).json(objSuccess(comissions));
};

module.exports = { getComissions };
