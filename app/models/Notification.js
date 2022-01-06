const { Schema, model } = require("mongoose");
const { User } = require("../models/User");

let notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: User, default: null },
    oneSignalSessions: [
      {
        _id: {
          type: String,
          default: null,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Notification", notificationSchema);
