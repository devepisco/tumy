const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");
const typeDocument = require("../../data/typeDocument");

let userSchema = new Schema(
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
      enum: typeDocument,
    },
    IDNumber: {
      type: String,
    },
    SOATNumber: {
      type: String,
    },
    VehicleRegistration: {
      type: String,
    },
    propertyCardNumber: {
      type: String,
    },
    business: {
      name: {
        type: String,
      },
      socialReason: {
        type: String,
      },
      ruc: {
        type: String,
      },
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
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["user", "driver", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew ) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const hash = function (user, salt, next) {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    return next();
  });
};
const hashToken = function (user, salt, next) {
  bcrypt.hash(user.passwordResetToken, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.passwordResetToken = newHash;
    user.passwordResetExpires = Date.now() + 3 * 10 * 60 * 1000;
    user.save();
    return next;
  });
};
const genSalt = function (user, SALT_FACTOR, next) {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    if (user?.passwordResetToken) {
      return hashToken(user, salt, next);
    } else return hash(user, salt, next);
  });
};

userSchema.pre("save", function (next) {
  const that = this;
  const SALT_FACTOR = 5;
  if (!that.isModified("password") || that.password.length == 60 ) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

userSchema.statics.comparePassword = async (password, recivedPasword) => {
  return await bcrypt.compare(password, recivedPasword);
};

userSchema.methods.createPasswordResetToken = function (next) {
  const that = this;
  const SALT_FACTOR = 5;
  return genSalt(that, SALT_FACTOR, next);
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
