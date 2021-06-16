const { Client } = require("@googlemaps/google-maps-services-js");
const { matchedData } = require("express-validator");

const detailPlace = async (req, res) => {
    let {place_id} = matchedData(req);
    const client = new Client({});
    const result = await client.placeDetails({
        params:{
            place_id:place_id,
            language:'es-419',
            fields:["geometry"],
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
module.exports= {detailPlace}