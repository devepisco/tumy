const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const mongoose_delete = require("mongoose-delete");
const moment = require("moment-timezone");
const datePeru = moment().tz("America/Lima").format();
const { User } = require("../models/User");

const requestServiceSchema = Schema(
  {
    origin: {
      coordinates: String,
      address: String,
    },
    destination: {
      coordinates: String,
      address: String,
    },
    costo: {
      type: Number,
    },
    tiempoAprox: {
      type: String,
    },
    detail: {
      descripcion: String,
      nombreRemitente: String,
      celularRemitente: String,
      nombreDestinatario: String,
      celularDestinatario: String,
      esDestinatario: Boolean,
      repartidorCobra: Boolean,
      pagoContraEntrega: Schema.Types.ObjectId,
      montoContraEntrega: Number,
      driverUser: { type: Schema.Types.ObjectId, ref: User },
    },
    globalState: {
      type: Schema.Types.ObjectId,
      ref: "GlobalState",
      default: null,
    },
    detailState: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "DetailState",
          default: null,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        obs: {
          type: String,
          default: null
        }
      },
    ],
    captures:{
      payment:[{ 
        type: String,
        default:null
      }],
      service:[{
        type: String,
        default:null
      }],
    },
    preferenceId: { type: String },
    creatorUser: { type: Schema.Types.ObjectId, ref: User },
  },
  {
    timestamps: true,
    default: datePeru,
  }
);

const detailStateSchema = new Schema({
  IdName: String,
  stateName: String,
});

const globalStateSchema = new Schema({
  IdName: String,
  stateName: String,
});

const paymentMethodSchema = new Schema({
  IdName: {
    type: String,
  },
  methodName: {
    type: String,
  },
});

requestServiceSchema.plugin(mongoosePaginateV2);
requestServiceSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: [
    "countDocuments",
    "find",
    "findOne",
    "findOneAndUpdate",
    "update",
    "aggregate",
  ],
});
const RequestService = model("RequestService", requestServiceSchema);
const DetailState = model("DetailState", detailStateSchema);
const GlobalState = model("GlobalState", globalStateSchema);
const PaymentMethod = model("PaymentMethod", paymentMethodSchema);

module.exports = { RequestService, PaymentMethod, DetailState, GlobalState };
