const Exceptions = require("../../../errors/Exceptions");
const RequestDriver = require("../../models/DriverRequests");
const { User } = require("../../models/User");
const { structure, objSuccess } = require("../../middlewares/utils");

const registerDriver = structure(async (req, res) => {
  const findedEmail = await RequestDriver.findOne({ email: req.body.email });
  if (findedEmail) throw new Exceptions(400, "El correo ya fue registrado");

  const findedIDNumber = await RequestDriver.findOne({ IDNumber: req.body.numID });
  if (findedIDNumber) throw new Exceptions(400, "El DNI ya fue registrado");

  const registeredDriver = new RequestDriver({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    IDType: req.body.typeID,
    IDNumber: req.body.numID,
    SOATNumber: req.body.numSOAT,
    VehicleRegistration: req.body.numPlaca,
    propertyCardNumber: req.body.numTarjetaPropiedad,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.file.filename,
  });
  await registeredDriver.save();

  const USER = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    IDType: req.body.typeID,
    IDNumber: req.body.numID,
    SOATNumber: req.body.numSOAT,
    VehicleRegistration: req.body.numPlaca,
    propertyCardNumber: req.body.numTarjetaPropiedad,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    profilePicture: req.file.filename,
    isBlocked: true,
  });
  await USER.save();

  return res
    .status(200)
    .json(
      objSuccess(
        (data = {}),
        (message = "Usuario motorizado registrado correctamente")
      )
    );
});

module.exports = { registerDriver };
