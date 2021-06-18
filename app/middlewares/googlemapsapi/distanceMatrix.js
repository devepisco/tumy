const { Client } = require("@googlemaps/google-maps-services-js");

const distanceMatrix  = async (origin, destination) => {
    const client = new Client({});
    const result = await client.distancematrix({
        params: {
            origins:[origin.trim()],
            destinations:[destination.trim()],
            key: process.env.GOOGLE_MAPS_API_KEY,
        }})
        .then(r => {
            return r.data;
        })
        .catch(e => {
            return e;
        });
    return result
}

module.exports = { distanceMatrix }