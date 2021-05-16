const { structure } = require("../../middlewares/utils");
const { findAllDataService } = require("./helpers");

const ServiceModel  = require("../../models/NewServices");
const { populate } = require("../../models/User");

const getAllDataServices = structure (async(req, res) =>{
    //obtener parametros fecha de inicio, fecha fin, estado de detalle, estado global
    estadoDetalle = req.params.estadoDetalle;
    estadoGlobal = req.params.estadoGlobal;
    beginDate = req.params.fechaInicio;
    endDate = req.params.fechaFinal;
    
    //Filtrar por fecha (beginDate y endDate)
    const data2 = await ServiceModel.SolicitudServicio.find({
        estadoDetalle:{ $not: { $size: 0 } }
    })
    .populate({ path:'estadoDetalle' }).populate({path:'estadoGlobal'}).populate({path:'detalle'})
    res.status(200).json({
        data2
    });
    
    //Filtrarpor estado Global
    
    
    const data = await findAllDataService();
    

    
});
 
module.exports = { getAllDataServices }