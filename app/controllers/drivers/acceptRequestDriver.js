const Exceptions = require("../../../errors/Exceptions");
const { structure, isIDGood, handleError, objSuccess } = require("../../middlewares/utils");
const RequestDriver = require("../../models/Driver");
const { User } = require("../../models/User")

const acceptRequestDriver = structure( async (req, res) => {
    idDriver = isIDGood(req.params.id);
    if(!idDriver) return handleError(res,"El Id de Solicitud de motorizado tiene un formato incorrecto",400);

    const FoundRequestDriver = await RequestDriver.findById({_id:idDriver});

    const foundEmailUser = await User.findOne({email: FoundRequestDriver.email})
    const foundIDUser = await User.findOne({IDNumber: FoundRequestDriver.IDNumber})
    if(foundEmailUser || foundIDUser) throw new Exceptions(400, "El Motorizado ya fue aceptado")

    FoundRequestDriver.status = "Aceptada";
    await FoundRequestDriver.save();

    const NewUserDriver = await new User({
        role:FoundRequestDriver.role,
        firstname: FoundRequestDriver.firstname,
        lastname:FoundRequestDriver.lastname,
        IDType:FoundRequestDriver.IDType,
        IDNumber:FoundRequestDriver.IDNumber,
        SOATNumber:FoundRequestDriver.SOATNumber,
        VehicleRegistration: FoundRequestDriver.VehicleRegistration,
        propertyCardNumber: FoundRequestDriver.propertyCardNumber,
        phone:FoundRequestDriver.phone,
        email:FoundRequestDriver.email,
        profilePicture:FoundRequestDriver.profilePicture
    })
    await NewUserDriver.save();
    res.status(200).json(objSuccess(NewUserDriver,"La solicitud de motorizado fue aceptada correctamente"));
});

module.exports = { acceptRequestDriver }