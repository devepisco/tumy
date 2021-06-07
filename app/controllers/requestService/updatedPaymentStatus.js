const { matchedData } = require("express-validator");
const { structure } = require("../../middlewares/utils");
const { updateItem } = require("../../middlewares/db");
const { RequestService } = require("../../models/NewServices");
const {
  findDetailState,
  asignDriverToService,
} = require("../users/helpers");

const updatedPaymentStatus = structure(async (req, res) => {
  const data = req.body;
  
  const detailState = await findDetailState("servicio_creado");
  data.detailState = [
    {
      _id: detailState._id,
    },
  ]

  const service = await updateItem(data.id, data, RequestService);

  asignDriverToService(service);

  return res.status(204).json();
});

module.exports = { updatedPaymentStatus };
