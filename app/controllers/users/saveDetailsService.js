const { structure, handleError, objSuccess, isIDGood } = require("../../middlewares/utils");
const { findPaymentMethod, findDetailState, findGlobalState } = require("../users/helpers");
const { RequestService, GlobalState, DetailState } = require("../../models/NewServices");

const saveDetailsService = structure(async (req,res) =>{
    idServicio = isIDGood(req.body.idServicio);
    const IdNamePago = await findPaymentMethod(req.body.nameIdPago);
    let updatedService = {};
    const foundService = await RequestService.findOne({_id: idServicio });
    if(!foundService) return handleError(res, 404, "No se encontró la solicitud de servicio");
    
    //Verficar si el servicio ya contiene un detalle para no sobreescribir el servicio
    if(foundService.detalle) return handleError(res, 404, "El servicio ya contiene un detalle existente");
    
    const detailState = await findDetailState("servicio_creado");
    const globalState = await findGlobalState("en_proceso");

    //crear nueva instancia del modelo NewServices/Detalle y actualizar el campo "detalle" del modelo RequestService
    if(req.body.esDestinatario == "true"){ 
        if(req.body.repartidorCobra == "true"){
            updatedService = await RequestService.findByIdAndUpdate(foundService._id,{
                detail:{
                    descripcion:req.body.descripcion,
                    nombreRemitente:req.body.nombreRemitente,
                    celularRemitente:req.body.celularRemitente,
                    nombreDestinatario:req.body.nombreDestinatario,
                    celularDestinatario:req.body.celularDestinatario,
                    esDestinatario:false,
                    repartidorCobra:true,
                    pagoContraEntrega:IdNamePago._id,
                    montoContraEntrega: foundService.costo
                }, 
                globalState: globalState._id 
            },{new:true});
        }else{
            updatedService = await RequestService.findByIdAndUpdate(foundService._id,{
                detail:{
                    descripcion:req.body.descripcion,
                    nombreRemitente:req.body.nombreRemitente,
                    celularRemitente:req.body.celularRemitente,
                    nombreDestinatario:req.body.nombreRemitente,
                    celularDestinatario:req.body.celularRemitente,
                    esDestinatario:true,
                    repartidorCobra:false,
                    pagoContraEntrega:IdNamePago._id,
                    montoContraEntrega: foundService.costo
                },
                globalState: globalState._id 
            },{new:true});
        }
    }else{
        if(req.body.repartidorCobra == "true"){
            updatedService = await RequestService.findByIdAndUpdate(foundService._id,{
                detail:{
                    descripcion:req.body.descripcion,
                    nombreRemitente:req.body.nombreRemitente,
                    celularRemitente:req.body.celularRemitente,
                    nombreDestinatario:req.body.nombreDestinatario,
                    celularDestinatario:req.body.celularDestinatario,
                    esDestinatario:false,
                    repartidorCobra:true,
                    pagoContraEntrega:IdNamePago._id,
                    montoContraEntrega: foundService.costo
                },
                globalState: globalState._id 
            },{new:true});
        }else{
            updatedService = await RequestService.findByIdAndUpdate(foundService._id,{
                detail:{
                    descripcion:req.body.descripcion,
                    nombreRemitente:req.body.nombreRemitente,
                    celularRemitente:req.body.celularRemitente,
                    nombreDestinatario:req.body.nombreDestinatario,
                    celularDestinatario:req.body.celularDestinatario,
                    esDestinatario:false,
                    repartidorCobra:false,
                    pagoContraEntrega:IdNamePago._id,
                    montoContraEntrega: foundService.costo
                },
                globalState: globalState._id 
            },{new:true});
        }
    }
    updatedService.detailState[0]={
        _id:detailState._id
    }
    await updatedService.save();

    if(updatedService.detail && updatedService.globalState && updatedService.detailState) {
        const data = await RequestService.aggregate([
            {
                $lookup:{
                    from: GlobalState.collection.name,
                    localField:'globalState',
                    foreignField:'_id',
                    as:'globalState'
                },
            },
            {
                $lookup:{
                    from: DetailState.collection.name,
                    localField:'detailState._id',
                    foreignField:'_id',
                    as:'detailState'
                },
            },
            {
                $match:{
                    _id:updatedService._id
                }
            }
        ]);
        res.status(200).json(objSuccess(data));
    }
    else return handleError(res, 404, "Hubo un error al guardar el estado del servicio");
});

module.exports= {saveDetailsService};