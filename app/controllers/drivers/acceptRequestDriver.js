const { matchedData } = require("express-validator");
const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const RequestDriver = require("../../models/DriverRequests");
const { User } = require("../../models/User");

const acceptRequestDriver = structure( async (req, res) => {
    const { id, action, reason } = matchedData(req);
    let message = "";
    const FoundRequestDriver = await RequestDriver.findById(id);
    if(!FoundRequestDriver) return handleError(res,400, "No se encontró la solicitud del motorizado.")
    switch(action){
        case 'accept':
            const foundEmailUser = await User.findOne({email: FoundRequestDriver.email})
            const foundIDUser = await User.findOne({IDNumber: FoundRequestDriver.IDNumber})
            if(foundEmailUser || foundIDUser) return handleError(res, 400, "El Motorizado ya fue aceptado")
        
            FoundRequestDriver.status = "Aceptada";
            FoundRequestDriver.reason = reason;
        
            await User.create({
                role:FoundRequestDriver.role,
                firstname: FoundRequestDriver.firstname,
                lastname:FoundRequestDriver.lastname,
                IDType:FoundRequestDriver.IDType,
                IDNumber:FoundRequestDriver.IDNumber,
                SOATNumber:FoundRequestDriver.SOATNumber,
                VehicleRegistration: FoundRequestDriver.VehicleRegistration,
                propertyCardNumber: FoundRequestDriver.propertyCardNumber,
                business:FoundRequestDriver.business,
                phone:FoundRequestDriver.phone,
                email:FoundRequestDriver.email,
                password:FoundRequestDriver.password,
                profilePicture:FoundRequestDriver.profilePicture
            })
            message = "La solicitud de motorizado fue aceptada correctamente";
            break;
        case 'reject':
            if(FoundRequestDriver.status == "Rechazada") {
                message = "La solicitud del motorizado ya fue rechazada."
                break;
            }
            FoundRequestDriver.status = "Rechazada";
            FoundRequestDriver.reason = reason;
            message = "La solicitud de motorizado fue rechazada correctamente";
            break
        default:
            break;
    
    }
    await FoundRequestDriver.save();
    res.status(200).json(objSuccess({},message));
});

module.exports = { acceptRequestDriver }