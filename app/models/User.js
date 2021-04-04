const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");

let userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "El correo es requerido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      select: false,
    },
    fullname: {
      type: String,
      uppercase: true,
      required: [true, "El nombre completo es requerido"],
    },
    country: {
      type: String,
      required: [true, "El pais es requerido"],
    },
    city: {
      type: String,
      required: [true, "La ciudad es requerida"],
    },
    phone: {
      type: String,
      required: [true, "El telefono es requerido"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
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
  if (!that.isModified("password")) {
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

module.exports = model("User", userSchema);
