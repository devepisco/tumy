const axios = require("axios").default;

/*
* Get payment methods from Mercadopago 
*/
const paymentsMethods = async () => {
  const { MERCADOPAGO_URL, MERCADOPAGO_ACCESS_TOKEN } = process.env;
  const HEADERS = {
    Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
  };
  const TYPES_DOCUMENTS = await axios.get(
    `${MERCADOPAGO_URL}/v1/payment_methods`,
    { headers: HEADERS }
  );

  return TYPES_DOCUMENTS;
};

module.exports = { paymentsMethods };
