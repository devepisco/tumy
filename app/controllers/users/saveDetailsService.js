const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const { findPaymentMethod, findDetailState, findGlobalState } = require("../users/helpers");

const { RequestService, Detail } = require("../../models/NewServices");
const mongoose = require('mongoose');

const saveDetailsService = structure(async (req,res) =>{
    const IdNamePago = await findPaymentMethod(req.body.nameIdPago);
    let nuevoDetalle = {};
    let detalle = {};
    const foundService = await RequestService.findOne({_id: req.body.idServicio});
    if(!foundService) return handleError(res, 404, "No se encontró la solicitud de servicio");
    
    //Verficar si el servicio ya contiene un detalle para no sobreescribir el servicio
    if(foundService.detalle) return handleError(res, 404, "El servicio ya contiene un detalle existente");
    
    //crear nueva instancia del modelo NewServices/Detalle y actualizar el campo "detalle" del modelo RequestService
    if(req.body.esDestinatario == "true"){ 
        if(req.body.repartidorCobra == "true"){
            detalle = await new Detail({
                _id:new mongoose.Types.ObjectId(),
                descripcion:req.body.descripcion,
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreDestinatario,
                celularDestinatario:req.body.celularDestinatario,
                esDestinatario:false,
                repartidorCobra:true,
                pagoContraEntrega:IdNamePago._id,
                montoContraEntrega: foundService.costo
            });
        }else{
            detalle = await new Detail({
                _id:new mongoose.Types.ObjectId(),
                descripcion:req.body.descripcion,
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreRemitente,
                celularDestinatario:req.body.celularRemitente,
                esDestinatario:true,
                repartidorCobra:false,
                pagoContraEntrega:IdNamePago._id,
                montoContraEntrega: foundService.costo
            });
        }
    }else{
        if(req.body.repartidorCobra == "true"){
            detalle = await new Detail({
                _id:new mongoose.Types.ObjectId(),
                descripcion:req.body.descripcion,
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreDestinatario,
                celularDestinatario:req.body.celularDestinatario,
                esDestinatario:false,
                repartidorCobra:true,
                pagoContraEntrega:IdNamePago._id,
                montoContraEntrega: foundService.costo
            });
        }else{
            detalle = await new Detail({
                _id:new mongoose.Types.ObjectId(),
                descripcion:req.body.descripcion,
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreDestinatario,
                celularDestinatario:req.body.celularDestinatario,
                esDestinatario:false,
                repartidorCobra:false,
                pagoContraEntrega:IdNamePago._id,
                montoContraEntrega: foundService.costo
            });
        }
    }
    
    //Buscar el _id correspondiente al EstadoDetalle "servicio creado"
    const estadoDetalle = await findDetailState("servicio_creado");

    //Actualizar el campo estadoDetalle en el modelo RequestService
    const dataEstadoDetalle = { estadoDetalle: estadoDetalle};
    const updatedEstadoDetalle = await RequestService
            .findByIdAndUpdate(foundService._id, dataEstadoDetalle);

    //Buscar el _id correspondiente al EstadoGlobal "en espera"
     const globalState = await findGlobalState("en_proceso");

    //Actualizar el campo globalState en el  modelo RequestService
    const dataEstadoGlobal = { globalState: globalState._id };
    const updatedEstadoGlobal = await RequestService
            .findByIdAndUpdate(foundService._id, dataEstadoGlobal, {
        new: true
    });
    //guardar el Detalle solo si se actualizaron correctamente los campos de estadoDetalle y globalState
    if(updatedEstadoDetalle.estadoDetalle && updatedEstadoGlobal.globalState) {
        nuevoDetalle = await detalle.save();
        //Actualizar el campo de detalle en el modelo Servicio
        const data = { detalle: nuevoDetalle._id };
        const datos = await RequestService.findByIdAndUpdate(foundService._id, data, {
            new: true
        });
        const data2 = {
            idServicio:foundService._id,
            descripcion: nuevoDetalle.descripcion,
            remitente: nuevoDetalle.nombreRemitente,
            celularRemitente: nuevoDetalle.celularRemitente,
            destinatario: nuevoDetalle.nombreDestinatario,
            celularDestinatario: nuevoDetalle.celularDestinatario,
            esDestinatario:nuevoDetalle.esDestinatario,
            repartidorCobra:nuevoDetalle.repartidorCobra,
            pagoContraEntrega:IdNamePago.methodName,
            montoContraEntrega: nuevoDetalle.montoContraEntrega,
            globalState:  globalState.stateName,
            estadoDetalle: {
                estado: estadoDetalle.stateName,
                fecha: datos.estadoDetalle[0].fecha
            },
            descripcion:nuevoDetalle.descripcion,
            createdAt:foundService.createdAt,
            updatedAt:foundService.updatedAt,
        }
        res.status(200).json(objSuccess(data2));
    }
    else return handleError(res, 404, "Hubo un error al guardar el estado del servicio");
});

module.exports= {saveDetailsService};