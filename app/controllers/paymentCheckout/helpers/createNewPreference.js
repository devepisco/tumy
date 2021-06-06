const mercadopago = require("../../../../config/mercadopago");

const createNewPreference = async (item, payer) => {
  let preference = {
    items: [item],
    payer,
  };
  if (payer?.identification?.type && payer.identification.type === "CE") {
    payer.identification.type = "C.E";
  }

  const { body } = await mercadopago.preferences.create(preference);

  return body;
};

module.exports = { createNewPreference };
