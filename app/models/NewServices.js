const { Schema, model } = require("mongoose");
const  moment  = require('moment-timezone');
const  datePeru = moment().tz("America/Lima").format();

const requestServiceSchema = Schema({
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
        globalState:{
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
                default: Date.now
            }
        }]
    },
    {
        timestamps: true,
        default:datePeru 
    }
);

const detailStateSchema = new Schema({
    IdName: String,
    stateName: String
});

const globalStateSchema = new Schema({
    IdName: String,
    stateName: String
});

const detailSchema = new Schema({
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
});

const paymentMethodSchema = new Schema({
    IdName: {
        type: String
    },
    methodName: {
        type: String
    }
});

const RequestService = model('RequestService', requestServiceSchema);
const DetailState = model('DetailState', detailStateSchema);
const GlobalState = model('GlobalState', globalStateSchema);
const Detail = model('Detail', detailSchema);  
const PaymentMethod = model('PaymentMethod', paymentMethodSchema);

module.exports = { RequestService, Detail, PaymentMethod, DetailState, GlobalState };