const { Schema, model } = require("mongoose");

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
    },
    minPrice:{
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("PriceRate", pricerateSchema);
