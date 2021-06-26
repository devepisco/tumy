const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils");
const { Comissions } = require("../../models/NewServices");

const addComission = structure(async (req, res) => {
  const data = matchedData(req);
  const newComission = new Comissions(data);
  await newComission.save();
  res
    .status(200)
    .json(
      objSuccess(
        newComission,
        "La nueva tarifa de comisión se agregó correctamente"
      )
    );
});
module.exports = { addComission };
