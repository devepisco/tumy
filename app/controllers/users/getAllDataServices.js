const { structure } = require("../../middlewares/utils");
const { findAllDataService } = require("./helpers");

const ServiceModel  = require("../../models/NewServices");

const getAllDataServices = structure (async(req, res) =>{
    //obtener parametros fecha de inicio, fecha fin, estado de detalle, estado global
    estadoDetalle = req.params.estadoDetalle;
    estadoGlobal = req.params.estadoGlobal;
    beginDate = req.params.fechaInicio;
    endDate = req.params.fechaFinal;
    const data = await findAllDataService();
    
    const data2 = await ServiceModel.SolicitudServicio.find({},{estadoDetalle: 1});

    res.status(200).json({
        data
    });
});

module.exports = { getAllDataServices }