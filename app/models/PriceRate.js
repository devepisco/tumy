const { Schema, model } = require("mongoose");

let pricerateSchema = new Schema(
  {
    IdName: {
      type:String
    },
    rateName: {
      type: String,
      uppercase: true
    },
    price: {
      type: Number
    },
    minPrice:{
      type: Number
    },
    isActive:{
      type:Boolean
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("PriceRate", pricerateSchema);
