const axios = require("axios").default;

/*
* Get types documents from Mercadopago 
*/
const typesDocuments = async () => {
  const { MERCADOPAGO_URL, MERCADOPAGO_ACCESS_TOKEN } = process.env;
  const HEADERS = {
    Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
  };
  const TYPES_DOCUMENTS = await axios.get(
    `${MERCADOPAGO_URL}/v1/identification_types`,
    { headers: HEADERS }
  );

  return TYPES_DOCUMENTS;
};

module.exports = { typesDocuments };
