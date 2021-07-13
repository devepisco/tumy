const {
  structure,
  handleError,
  objSuccess,
} = require("../../middlewares/utils");
const Exceptions = require("../../../errors/Exceptions");
const { findPriceRate } = require("./helpers");
const { RequestService } = require("../../models/NewServices");
const {
  distanceMatrix,
} = require("../../middlewares/googlemapsapi/distanceMatrix");
const { matchedData } = require("express-validator");

const createService = structure(async (req, res) => {
  const { origin, destination } = matchedData(req);
  const userId = req.user._id;

  const getdistance = await distanceMatrix(origin, destination);
  if (getdistance.rows[0].elements[0].status == "NOT_FOUND")
    return handleError(
      res,
      400,
      "No ha encontrado la distancia entre el origen y destino."
    );
  else {
    const distancia = Math.round(getdistance.rows[0].elements[0].distance.value /100)/10;
    const tarifa_estandar = await findPriceRate("tarifa_estandar");
    let costo = Math.round(distancia * tarifa_estandar.price * 10) / 10;
    if (costo < tarifa_estandar.minPrice) costo = tarifa_estandar.minPrice;

    //Funcion para guardar datos de nuevo Servicio
    const NewService = new RequestService({
      origin: {
        coordinates: origin,
        address: getdistance.origin_addresses[0],
      },
      destination: {
        coordinates: destination,
        address: getdistance.destination_addresses[0],
      },
      costo: `${costo.toFixed(2)}`,
      tiempoAprox: getdistance.rows[0].elements[0].duration.text,
      creatorUser: userId,
    });
    const currentService = await NewService.save();
    //return res.json(data);
    const data = {
      idServicio: currentService._id,
      origen: currentService.origin.address,
      destino: currentService.destination.address,
      distancia: getdistance.rows[0].elements[0].distance.text,
      tiempoAprox: getdistance.rows[0].elements[0].duration.text,
      costo: currentService.costo + " soles",
    };
    res.status(200).json(objSuccess(data, "Servicio creado correctamente"));
  }
});

module.exports = { createService };
