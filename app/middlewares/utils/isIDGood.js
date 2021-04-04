const mongoose = require("mongoose");
const Exceptions = require("../../../errors/Exceptions");
const isIDGood = (id = "") => {
  const goodID = mongoose.Types.ObjectId.isValid(id);
  if (goodID) return id;
  else throw new Exceptions("El formato de ID es incorrecto");
};

module.exports = { isIDGood };
