const { RequestService } = require("../../models/NewServices");
const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const { findDetailState, findGlobalState } = require("../users/helpers");


const cancelService = structure( async (req, res) =>{
    const foundService1 = await RequestService.findOne({_id: req.params.id});
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

        //Actualizar el campo estadoDetalle en el modelo RequestService
        let updatedEstadoDetalle = null
        const countDetailStates = await foundService1.estadoDetalle.length;
        await foundService1.estadoDetalle.push(estadoDetalle._id)
        await foundService1.save();
        //console.log(foundService1)
        if(foundService1.estadoDetalle.length>countDetailStates) updatedEstadoDetalle=1;

        //Buscar el _id correspondiente al EstadoGlobal "en espera"
         const globalState = await findGlobalState("cancelado");
        
        //Actualizar el campo globalState en el  modelo RequestService
        const dataEstadoGlobal = { globalState: globalState._id };
        const updatedEstadoGlobal = await RequestService
                .findByIdAndUpdate(IdServicio, dataEstadoGlobal, {
            new: true
        });
        
        if(updatedEstadoDetalle==1 && updatedEstadoGlobal.globalState._id) {
            
            res.status(200).json(objSuccess(
                data = {},
                message = 'El servicio  '+ IdServicio +' fue cancelado'
            ));
        }
});

module.exports = { cancelService }