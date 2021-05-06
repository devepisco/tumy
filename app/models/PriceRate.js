const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const mongoose_delete = require("mongoose-delete");

let pricerateSchema = new Schema(
  {
    nameId: {
      type:String
    },
    namerate: {
      type: String,
      uppercase: true
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

pricerateSchema.plugin(mongoosePaginateV2);
pricerateSchema.plugin(mongoose_delete, {
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

module.exports = model("PriceRate", pricerateSchema);
