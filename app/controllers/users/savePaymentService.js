const { matchedData } = require("express-validator");
const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const { updateItem, getItem } = require("../../middlewares/db");
const { createToken, createCharge } = require("../culqi/helpers");
const { RequestService } = require("../../models/NewServices");
const { asignDriverToService } = require("../users/helpers");

const savePaymentService = structure(async (req, res) => {
  console.log(req.body);
  const data = req.body;
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
    const updatedService = await updateItem(
      data._id,
      {
        chargeId: charge.id,
        hasPaid: true,
        paidState: charge.state,
      },
      RequestService
    );
    /* Se emite el servicio -> motorizado disponible*/
    asignDriverToService(updatedService);
  } catch (err) {
    console.log(err);
    handleError(
      res,
      500,
      err.user_message ||
        "Ocurrió un error interno, porfavor vuelva a intentarlo mas tarde"
    );
  }
  return res
    .status(200)
    .json({ message: "El pago se efectuó de manera correcta" });
});

module.exports = { savePaymentService };
