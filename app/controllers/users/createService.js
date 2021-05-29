const {Client} = require("@googlemaps/google-maps-services-js");
const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const Exceptions = require('../../../errors/Exceptions');
const { findPriceRate } = require("./helpers");
const { RequestService } = require("../../models/NewServices");

const createService = structure(async (req,res) =>{
    
    let origin = req.body.origin;
    let destination = req.body.destination;
    const userId = req.user._id;
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
            const tarifa_estandar = await findPriceRate('tarifa_estandar');
            
            var costo = distancia * tarifa_estandar.price;
            if(costo < tarifa_estandar.minPrice) costo = tarifa_estandar.minPrice;
            
            //Funcion para guardar datos de nuevo Servicio
            const NewService = new RequestService({
                origin:{
                    coordinates: req.body.origin,
                    address: getdistance.data.origin_addresses[0]
                },
                destination:{
                    coordinates: req.body.destination,
                    address: getdistance.data.destination_addresses[0]
                },
                costo:costo,
                tiempoAprox:getdistance.data.rows[0].elements[0].duration.text,
                creatorUser: userId
            });
            const currentService = await NewService.save();
            //return res.json(data);
            const data = {
                idServicio: currentService._id,
                origen: currentService.origin.address,
                destino: currentService.destination.address,
                distancia: getdistance.data.rows[0].elements[0].distance.text,
                tiempoAprox: getdistance.data.rows[0].elements[0].duration.text,
                costo: currentService.costo + ' soles'
            }
            res.status(200).json(objSuccess(data,"Servicio creado correctamente"));
        }
    }
    
});

module.exports = { createService };