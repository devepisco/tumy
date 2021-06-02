const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const Exceptions = require('../../../errors/Exceptions');
const { findPriceRate } = require("./helpers");
const { RequestService } = require("../../models/NewServices");
const { distanceMatrix } = require("../../middlewares/googlemapsapi/distanceMatrix");

const createService = structure(async (req,res) =>{
    
    const origin = req.body.origin;
    const destination = req.body.destination;
    const userId = req.user._id;

    if(origin.length < 2 || destination.length < 2) throw new Exceptions(400, "Error al ingresar las coordenadas")
    else{
        const getdistance = await distanceMatrix(origin, destination);
        if(!getdistance) return handleError(res, 400, "Ocurrió algo inesperado")
        else{
            const distancia = parseFloat(getdistance.rows[0].elements[0].distance.text);
            const tarifa_estandar = await findPriceRate('tarifa_estandar');
            const costo = distancia * tarifa_estandar.price;
            if(costo < tarifa_estandar.minPrice) costo = tarifa_estandar.minPrice;
            
            //Funcion para guardar datos de nuevo Servicio
            const NewService = new RequestService({
                origin:{
                    coordinates: req.body.origin,
                    address: getdistance.origin_addresses[0]
                },
                destination:{
                    coordinates: req.body.destination,
                    address: getdistance.destination_addresses[0]
                },
                costo:costo,
                tiempoAprox:getdistance.rows[0].elements[0].duration.text,
                creatorUser: userId
            });
            const currentService = await NewService.save();
            //return res.json(data);
            const data = {
                idServicio: currentService._id,
                origen: currentService.origin.address,
                destino: currentService.destination.address,
                distancia: getdistance.rows[0].elements[0].distance.text,
                tiempoAprox: getdistance.rows[0].elements[0].duration.text,
                costo: currentService.costo + ' soles'
            }
            res.status(200).json(objSuccess(data,"Servicio creado correctamente"));
        }
    }
    
});

module.exports = { createService };