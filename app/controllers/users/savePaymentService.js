const { matchedData } = require("express-validator");
const { structure } = require("../../middlewares/utils");
const { updateItem, getItem } = require("../../middlewares/db");
const { createToken, createCharge } = require("../culqi/helpers");
const { RequestService } = require("../../models/NewServices");
const Exceptions = require("../../../errors/Exceptions");

const savePaymentService = structure(async (req, res) => {
  const { info } = req.body;
  const data = JSON.parse(info);
  try {
    const token = await createToken(data);
    console.log(token);
    const service = await getItem(data._id, RequestService);
    const charge = await createCharge({
      amount: `${service.costo}`.replace(".", ""),
      email: data.email,
      source_id: token.id,
      capture: true,
      antifraud_details: {
        first_name: data.firstname,
        last_name: data.lastname,
        phone_number: req.user.phone,
      },
    });
    console.log(charge);
  } catch (err) {
    throw new Exceptions(
      500,
      err.user_message ||
        "Ocurrió un error interno, porfavor vuelva a intentarlo mas tarde"
    );
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
