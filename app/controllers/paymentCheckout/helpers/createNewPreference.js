const mercadopago = require("../../../../config/mercadopago");

const createNewPreference = async (item, payer) => {
  let preference = {
    items: [item],
    payer,
    expires: true,
    payment_methods: {
      excluded_payment_methods: [{ id: "ticket" }, { id: "atm" }],
      default_installments: 1,
    },
  };
  if (payer?.identification?.type && payer.identification.type === "CE") {
    payer.identification.type = "C.E";
  }

  const { body } = await mercadopago.preferences.create(preference);

  return body;
};

module.exports = { createNewPreference };
