const { Client } = require("@googlemaps/google-maps-services-js");

const distanceMatrix  = async (origin, destination) => {
    const client = new Client({});
    origin = origin.split(",");
    destination = destination.split(",")
    const result = await client.distancematrix({
        params: {
            origins:[{lat:origin[0].trim(),lng:origin[1].trim()}],
            destinations:[{ lat:destination[0].trim(),lng:destination[1].trim()}],
            key: process.env.GOOGLE_MAPS_API_KEY,
        }})
        .then((r) => {
            return r.data;
        })
    return result
}

module.exports = { distanceMatrix }