const {Client} = require("@googlemaps/google-maps-services-js");
const { structure, handleError } = require("../../middlewares/utils");
const Exceptions = require('../../../errors/Exceptions');
const { findPriceRate } = require("../users/helpers/findPriceRate");

const getPrice = structure(async (req,res) =>{
    
    let origin = req.body.origin;
    let destination = req.body.destination;
    
    origin = origin.split(",");
    destination = destination.split(",");

    if(origin.length < 2 || destination.length < 2) throw new Exceptions(400, "Error al ingresar las coordenadas")
    else{
        const client = new Client({});
        const getdistance = await client.distancematrix({
            params: {
                origins:[{lat:origin[0].trim(),lng:origin[1].trim()}],
                destinations:[{ lat:destination[0].trim(),lng:destination[1].trim()}],
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000, // milliseconds
        })
        if(!getdistance) return handleError(res, 400, "Ocurrió algo inesperado")
        else{
            const distancia = parseFloat(getdistance.data.rows[0].elements[0].distance.text);
            const tarifa_minima = await findPriceRate('tarifa_minima');
            const tarifa_estandar = await findPriceRate('tarifa_estandar');
           
            var costo = distancia * tarifa_estandar.price;
            if(costo<tarifa_minima.price) costo = tarifa_minima.price;
            res.status(200).json({
                status: 'success',
                info: {
                    origen: getdistance.data.origin_addresses[0],
                    destino: getdistance.data.destination_addresses[0],
                    distancia: getdistance.data.rows[0].elements[0].distance.text,
                    duracion: getdistance.data.rows[0].elements[0].duration.text,
                    costo: costo + ' soles'
                }
            })
        }
    }
    
});

module.exports = { getPrice };