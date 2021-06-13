const { culqi } = require("../../../../config/culqi");

const createCharge = async ({
  amount = 0,
  currency_code = "PEN",
  email = "",
  source_id = "",
  capture = true,
  description = "Servicio de courier",
  installments = 0,
  metadata = {},
  antifraud_details = {
    address: "",
    address_city: "Lima",
    country_code: "PE",
    first_name: "",
    last_name: "",
    phone_number: "",
  },
}) => {
  const charge = await culqi.charges.createCharge({
    amount,
    currency_code,
    email,
    source_id,
    capture,
    description,
    installments,
    metadata,
    antifraud_details,
  });
  return charge;
};

module.exports = { createCharge };
