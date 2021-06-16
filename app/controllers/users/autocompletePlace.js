const { Client } = require("@googlemaps/google-maps-services-js");
const { matchedData } = require("express-validator");

const autocompletePlace = async (req, res) => {
    let {place} = matchedData(req);
    const client = new Client({});
    const result = await client.placeAutocomplete({
        params:{
            input:place,
            types:'address',
            language:'es-419',
            components:'country:pe',
            key:process.env.GOOGLE_MAPS_API_KEY
        }
    })
    .then((r) => {
        return r.data;
    })
    .catch((e) => {
        return e.response.data.error_message;
      })
    res.status(200).json(result)
}
module.exports = { autocompletePlace}