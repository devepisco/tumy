const { Client } = require("@googlemaps/google-maps-services-js");

const searchAddressByCoordinates = async (coordinates) => {
  const client = new Client({});
  return await client
    .reverseGeocode({
      params: {
        latlng: coordinates,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    })
    .then((r) => {
      return r.data.results[0].formatted_address;
    })
    .catch((e) => {
      return e.response.data.error_message;
    });
};

module.exports = { searchAddressByCoordinates };
