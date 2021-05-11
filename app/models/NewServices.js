const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const solicitudServicioSchema = new Schema({
        origenCoordenadas:{
            type: String
        },
        destinoCoordenadas:{
            type:String
        },
        costo:{
            type: Number
        },
        tiempoAprox:{
            type: String
        },
        detalle:[{
            type: Schema.Types.ObjectId, ref: 'Detalle',
            default:null
        }]
    },
    {
        timestamps: true,
    }
);

const detalleSchema = new Schema({
        _id: Schema.Types.ObjectId,
        descripcion:{
            type: String
        },
        nombreRemitente:{
            type:String
        },
        celularRemitente:{
            type:String
        },
        nombreDestinatario:{
            type:String
        },
        celularDestinatario:{
            type:String
        },
        esDestinatario: {
            type: Boolean,
            default: false
        },
        repartidorCobra: {
            type: Boolean,
            default: false
        },
        pagoContraEntrega:{
            type: Schema.Types.ObjectId, ref: 'PagoContraEntrega',
            default: null
        },
        montoContraEntrega:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const pagoContraEntregaSchema = new Schema({
    nameId: {
        type: String
    },
    nameMethod: {
        type: String
    }
});

const SolicitudServicio = mongoose.model('SolicitudServicio', solicitudServicioSchema);
const Detalle = mongoose.model('Detalle', detalleSchema);
const PagoContraEntrega = mongoose.model('PagoContraEntrega', pagoContraEntregaSchema);


module.exports = { SolicitudServicio, Detalle, PagoContraEntrega};