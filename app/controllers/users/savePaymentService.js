const { matchedData } = require("express-validator");
const { structure } = require("../../middlewares/utils");
const { updateItem, getItem } = require("../../middlewares/db");
const { createToken, createCharge } = require("../culqi/helpers");
const { RequestService } = require("../../models/NewServices");

const savePaymentService = structure(async (req, res) => {
  const { info } = req.body;
  const data = JSON.parse(info);
  try {
    const token = await createToken(data);
    const service = await getItem(data._id, RequestService);
    const charge = await createCharge({
      amount: `${service.costo}`.replace(".", ""),
      email: data.email,
      source_id: token.id,
      capture: true,
      antifraud_details: {
        first_name: req.user.firstname,
        last_name: req.user.lastname,
        phone_number: req.user.phone,
      },
    });
  } catch (err) {
    console.log(err)
  }
  const updatedService = await updateItem(
    data._id,
    {
      chargeId: charge.id,
      hasPaid: true,
      paidState: charge.state,
    },
    RequestService
  );
  return res.status(204).json();
});

module.exports = { savePaymentService };
