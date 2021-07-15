const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");
const crypto = require('crypto');
const typeDocument = require("../../data/typeDocument")

let userSchema = new Schema(
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
      uppercase: true,
      enum: typeDocument,
    },
    IDNumber: {
      type: String
    },
    SOATNumber:{
      type: String
    },
    VehicleRegistration:{
      type: String
    },
    propertyCardNumber:{
      type: String
    },
    business:{
      name:{
        type: String
      },
      socialReason:{
        type: String
      },
      ruc:{
        type: String
      }
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
    passwordChangedAt: {
      type: Date
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires:{
      type: Date
    },
    role: {
      type: String,
      enum: ["user", "driver" ,"admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next){
  if(!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now()-1000;
  next();
});

userSchema.methods.createPasswordResetToken = function (){
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}
const hash = function (user, salt, next) {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    return next();
  });
};

const genSalt = function (user, SALT_FACTOR, next) {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(user, salt, next);
  });
};

userSchema.pre("save", function (next) {
  const that = this;
  const SALT_FACTOR = 5;
  if (!that.isModified("password") || that.password.length == 60) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

userSchema.statics.comparePassword = async (password, recivedPasword) => {
  return await bcrypt.compare(password, recivedPasword);
};

userSchema.plugin(mongoosePaginateV2);
userSchema.plugin(mongoose_delete, {
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

const User = mongoose.model('User', userSchema);

module.exports = { User }