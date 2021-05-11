const CreateNewService = require("../../../models/NewServices");
const { structure } = require('../../../middlewares/utils');

const createService = structure(async(req,dataDistance,costo,res) =>{

    // console.log(dataDistance.data.rows[0].elements[0].distance.text);
    const NewService = new CreateNewService({
        origenCoordenadas:req.body.origin,
        destinoCoordenadas:req.body.destination,
        costo:costo,
        tiempoAprox:dataDistance.data.rows[0].elements[0].duration.text
    });
    const data = await NewService.save()
    return res.json(data)
});

module.exports = { createService };