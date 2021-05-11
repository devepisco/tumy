const { structure } = require("../../middlewares/utils");
const Exceptions = require('../../../errors/Exceptions');
const { findPaymentMethod } = require("../users/helpers/findPaymentMethod");

const NewServiceTemplate = require("../../models/NewServices");
const mongoose = require('mongoose');

const saveDetailsService = structure(async (req,res) =>{
    let nuevoDetalle = {};
    const nameIdPago = await findPaymentMethod(req.body.nameIdPago);
    
    const foundService = await NewServiceTemplate.SolicitudServicio.findOne({ _id: req.body.idServicio });
    if(!foundService) throw new Exceptions(400, "No se encontró la solicitud de servicio")

    if(req.body.esDestinatario){ 
        if(req.body.repartidorCobra){
            const DetailsService = await new NewServiceTemplate.Detalle({
                _id:new mongoose.Types.ObjectId(),
                descripcion:"",
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreRemitente,
                celularDestinatario:req.body.celularRemitente,
                esDestinatario:true,
                repartidorCobra:true,
                pagoContraEntrega:nameIdPago._id,
                montoContraEntrega: foundService.costo
            });
            nuevoDetalle = await DetailsService.save();
        }else{
            const DetailsService = await new NewServiceTemplate.Detalle({
                _id:new mongoose.Types.ObjectId(),
                descripcion:"",
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreRemitente,
                celularDestinatario:req.body.celularRemitente,
                esDestinatario:true,
                repartidorCobra:false,
                pagoContraEntrega:nameIdPago._id,
                montoContraEntrega: foundService.costo
            });
            nuevoDetalle = await DetailsService.save();
        }
    }else{
        if(req.body.repartidorCobra){
            const DetailsService = await new NewServiceTemplate.Detalle({
                _id:new mongoose.Types.ObjectId(),
                descripcion:"",
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreDestinatario,
                celularDestinatario:req.body.celularDestinatario,
                esDestinatario:false,
                repartidorCobra:true,
                pagoContraEntrega:nameIdPago._id,
                montoContraEntrega: foundService.costo
            });
            nuevoDetalle = await DetailsService.save();
        }else{
            const DetailsService = await new NewServiceTemplate.Detalle({
                _id:new mongoose.Types.ObjectId(),
                descripcion:"",
                nombreRemitente:req.body.nombreRemitente,
                celularRemitente:req.body.celularRemitente,
                nombreDestinatario:req.body.nombreDestinatario,
                celularDestinatario:req.body.celularDestinatario,
                esDestinatario:false,
                repartidorCobra:false,
                pagoContraEntrega:nameIdPago._id,
                montoContraEntrega: foundService.costo
            }); 
            nuevoDetalle = await DetailsService.save();
        }
        
    }
    
    //buscar el ID de servicio, recibido en la ruta saveDetails + detalle de servicio
    const data = {
        detalle: nuevoDetalle._id
    };
    await NewServiceTemplate.SolicitudServicio.findByIdAndUpdate(req.body.idServicio, data);
    
    const UpdatedService = await NewServiceTemplate.SolicitudServicio.findOne({_id:req.body.idServicio});
    const Detalles = await NewServiceTemplate.Detalle.findOne({_id:nuevoDetalle._id});
    
    res.status(200).json({
        idServicio:UpdatedService._id,
        remitente: Detalles.nombreRemitente,
        celularRemitente: Detalles.celularRemitente,
        destinatario: Detalles.nombreDestinatario,
        celularDestinatario: Detalles.celularDestinatario,
        esDestinatario:Detalles.esDestinatario,
        repartidorCobra:Detalles.repartidorCobra,
        pagoContraEntrega:nameIdPago.nameMethod,
        montoContraEntrega: Detalles.montoContraEntrega,
        descripcion:Detalles.descripcion,
        createdAt:Detalles.createdAt,
        updatedAt:Detalles.updatedAt
    });
});

module.exports= {saveDetailsService};