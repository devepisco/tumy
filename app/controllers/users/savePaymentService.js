const { matchedData } = require("express-validator");
const { structure } = require("../../middlewares/utils");
const { updateItem } = require("../../middlewares/db");
const { createToken } = require("../culqi/helpers");


const savePaymentService = structure(async (req, res) => {
  const data = req.body;
  const card = JSON.parse(data.info);
  const user = req.user;
  metadata = {};
  user.IDType === "DNI"
    ? (metadata["dni"] = user.IDNumber)
    : (metadata["documento_identidad"] = user.IDNumber);
  const token = await createToken(card, user.email, metadata);
  console.log(token);
  data.amount = data.amount.replace(".", "");
  const charge = await createCharge({
    data,
  });
  console.log(charge);
  const updatedService = await updateItem(data._id, 
    {  
        chargeId: charge.id,
        hasPaid: true,
        paidState: charge.state,
    })
  return res.status(204).json();
});

module.exports = { savePaymentService };
