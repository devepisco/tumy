const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");

let driverSchema = new Schema(
  {
    firstname: {
      type: String,
      uppercase: true
    },
    lastname: {
      type: String,
      uppercase: true
    },
    IDType: {
      type: String,
      uppercase: true
    },
    IDNumber: {
      type: String,
      uppercase: true
    },
    SOATNumber:{
      type: String
    },
    VehicleRegistration:{
      type: String,
      uppercase: true
    },
    propertyCardNumber:{
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      select: false,
    },
    profilePicture:{
    },
    status: {
      obs:{
        type:String,
        default:"Pendiente"
      },
      reason:{
        type: String,
        default: null,
      }
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

const hash = function (driver, salt, next) {
  bcrypt.hash(driver.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    driver.password = newHash;
    return next();
  });
};

const genSalt = function (driver, SALT_FACTOR, next) {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(driver, salt, next);
  });
};

driverSchema.pre("save", function (next) {
  const that = this;
  const SALT_FACTOR = 5;
  if (!that.isModified("password")) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

driverSchema.statics.comparePassword = async (password, recivedPasword) => {
  return await bcrypt.compare(password, recivedPasword);
};

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
