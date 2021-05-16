const ServiceModel = require("../../models/NewServices");
const { structure, handleError } = require("../../middlewares/utils");
const Exceptions = require('../../../errors/Exceptions');
const { findDetailState, findGlobalState } = require("../users/helpers");


const cancelService = structure( async (req, res) =>{
    const foundService1 = await ServiceModel.SolicitudServicio.findOne({_id: req.params.id});
    if(!foundService1) return handleError(res, 404, "No se encontró la solicitud de servicio");

    const IdServicio = req.params.id;
        //Buscar el _id correspondiente al EstadoDetalle "servicio creado"
        const estadoDetalle = await findDetailState("cancelado");

        //Consultar si ya fue cancelado
        let cancelado = null;
        for(estado in foundService1.estadoDetalle){
            if(foundService1.estadoDetalle[estado]._id.toString() == estadoDetalle._id.toString()) cancelado = 1;
        }
        if(cancelado) return handleError(res, 404,"El servicio ya fue cancelado");

        //Actualizar el campo estadoDetalle en el modelo SolicitudServicio
        let updatedEstadoDetalle = null
        const countDetailStates = await foundService1.estadoDetalle.length;
        await foundService1.estadoDetalle.push(estadoDetalle._id)
        await foundService1.save();
        //console.log(foundService1)
        if(foundService1.estadoDetalle.length>countDetailStates) updatedEstadoDetalle=1;

        //Buscar el _id correspondiente al EstadoGlobal "en espera"
         const estadoGlobal = await findGlobalState("cancelado");
        
        //Actualizar el campo estadoGlobal en el  modelo SolicitudServicio
        const dataEstadoGlobal = { estadoGlobal: estadoGlobal._id };
        const updatedEstadoGlobal = await ServiceModel.SolicitudServicio
                .findByIdAndUpdate(IdServicio, dataEstadoGlobal, {
            new: true
        });
        
        const foundService  = await ServiceModel.SolicitudServicio.findOne({ _id : IdServicio })
                .populate('detalle')
                .populate('estadoGlobal')
                .populate('estadoDetalle._id')
                .exec();
        if(updatedEstadoDetalle==1 && updatedEstadoGlobal.estadoGlobal._id) {
            res.status(200).json({
                foundService
            })
        }
});

module.exports = { cancelService }