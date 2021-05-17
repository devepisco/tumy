const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const  moment  = require('moment-timezone');
const  datePeru = moment().tz("America/Lima").format();

const solicitudServicioSchema = Schema({
        origenCoordenadas:{
            type: String
        },
        destinoCoordenadas:{
            type:String
        },
        origenDireccion:{
            type:String
        },
        destinoDireccion:{
            type:String
        },
        costo:{
            type: Number
        },
        tiempoAprox:{
            type: String
        },
        detalle:{
            type: Schema.Types.ObjectId, ref: 'Detalle',
            default:null
        },
        estadoGlobal:{
            type:Schema.Types.ObjectId, ref: 'EstadoGlobal',
            default:null
        },
        estadoDetalle:[{
            _id:{
                type:Schema.Types.ObjectId, ref: 'EstadoDetalle',
                default:null
            },
            fecha: {
                type: Date,
                default:datePeru
            }
        }]
    },
    {
        timestamps: true,
        default:datePeru 
    }
);

const estadoDetalleSchema = new Schema({
    nameId: String,
    nameEstado: String
});

const estadoGlobalSchema = new Schema({
    nameId: String,
    nameEstado: String
});

const detalleSchema = new Schema({
        _id:Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            default: null
        },
        montoContraEntrega:{
            type: Number,
            default: 0
        }
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
const EstadoDetalle = mongoose.model('EstadoDetalle', estadoDetalleSchema);
const EstadoGlobal = mongoose.model('EstadoGlobal', estadoGlobalSchema);
const Detalle = mongoose.model('Detalle', detalleSchema);  
const PagoContraEntrega = mongoose.model('PagoContraEntrega', pagoContraEntregaSchema);

module.exports = { SolicitudServicio, Detalle, PagoContraEntrega, EstadoDetalle, EstadoGlobal};