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
      type: String,
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
<<<<<<< HEAD
      driverUser: { type: Schema.Types.ObjectId, ref: User, default: null },
=======
      driverUser: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: null,
      },
>>>>>>> eea032ba5d109faeb124c0749923db600bf73070
      comission: {
        _id: { type: Schema.Types.ObjectId, ref: "Comissions" },
        amount: Number,
      },
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
          default: null,
        },
      },
    ],
    captures: {
      payment: [
        {
          type: String,
          default: null,
        },
      ],
      service: [
        {
          type: String,
          default: null,
        },
      ],
    },
    chargeId: { type: String },
    hasPaid: Boolean,
    paidState: String,
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

const ComissionsSchema = new Schema(
  {
    comissionName: {
      type: String,
    },
    amount: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

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
const Comissions = model("Comissions", ComissionsSchema);

module.exports = {
  RequestService,
  PaymentMethod,
  DetailState,
  GlobalState,
  Comissions,
};
