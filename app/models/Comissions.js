const { model, Schema } = require("mongoose");

const ComissionsSchema = new Schema(
  {
    amount: {
      type: Double,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Comissions", ComissionsSchema);
