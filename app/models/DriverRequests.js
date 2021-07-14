const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");

let driverSchema = new Schema(
  {
    firstname: {
      type: String,
      uppercase: true,
    },
    lastname: {
      type: String,
      uppercase: true,
    },
    IDType: {
      type: String,
      uppercase: true,
    },
    IDNumber: {
      type: String,
      uppercase: true,
    },
    SOATNumber: {
      type: String,
    },
    VehicleRegistration: {
      type: String,
      uppercase: true,
    },
    propertyCardNumber: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePicture: {},
    status: {
      type: String,
      default: "Pendiente",
    },
    reason: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "driver",
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.plugin(mongoosePaginateV2);
driverSchema.plugin(mongoose_delete, {
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

module.exports = model("RequestDriver", driverSchema);
