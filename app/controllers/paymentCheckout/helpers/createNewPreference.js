const mercadopago = require("../../../../config/mercadopago");

const createNewPreference = async (item, payer) => {
  let preference = {
    items: [item],
    payer,
    expires: true,
    payment_methods: {
      excluded_payment_types: [{ id: "ticket" }, { id: "atm" }],
      default_installments: 1,
    },
  };
  payer.email="rodrigoberrios1998@gmail.com"
  if (payer?.identification?.type && payer.identification.type === "CE") {
    payer.identification.type = "C.E";
  }
  console.log(preference)
  const { body } = await mercadopago.preferences.create(preference);

  return body;
};

module.exports = { createNewPreference };
