const { RequestService } = require("../../models/NewServices");
const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const { findDetailState, findGlobalState } = require("../users/helpers");


const cancelService = structure( async (req, res) =>{
    const foundService = await RequestService.findOne({_id: req.params.id});
    if(!foundService) return handleError(res, 404, "No se encontró la solicitud de servicio");

    const IdServicio = req.params.id;
        const estadoDetalle = await findDetailState("cancelado");
        let cancelado = null;

        for(estado in foundService.detailState){
            if(foundService.detailState[estado]._id.toString() == estadoDetalle._id.toString()) cancelado = 1;
        }
        if(cancelado) return handleError(res, 404,"El servicio ya fue cancelado");

        let updatedEstadoDetalle = null
        const countDetailStates = foundService.detailState.length;
        foundService.detailState.push(estadoDetalle._id)
        await foundService.save();
        if(foundService.detailState.length>countDetailStates) updatedEstadoDetalle=1;

         const globalState = await findGlobalState("cancelado");
        
        const dataEstadoGlobal = { globalState: globalState._id };
        const updatedEstadoGlobal = await RequestService
                .findByIdAndUpdate(IdServicio, dataEstadoGlobal, {
            new: true
        });
        
        if(updatedEstadoDetalle == 1 && updatedEstadoGlobal.globalState.toString() == globalState._id.toString()) {
            
            res.status(200).json(objSuccess(
                data = {},
                message = 'El servicio  '+ IdServicio +' fue cancelado'
            ));
        }
});

module.exports = { cancelService }