const { matchedData } = require("express-validator");
const { structure, handleError, objSuccess } = require("../../middlewares/utils");
const { findById } = require("../../models/DriverRequests");
// const { decrypt } = require("../../middlewares/crypto");
const RequestDriver = require("../../models/DriverRequests");
const { User } = require("../../models/User");

const acceptRequestDriver = structure( async (req, res) => {
    const { id, action, reason } = matchedData(req);
    let foundUser;
    let message = "";
    const FoundRequestDriver = await RequestDriver.findById(id);
    if(!FoundRequestDriver) return handleError(res,400, "No se encontró la solicitud del motorizado.")
    switch(action){
        case 'accept':
            foundUser = await User.findOne({email: FoundRequestDriver.email})
            if(FoundRequestDriver.status == 'Aceptado') return handleError(res, 400, "El Motorizado ya fue aceptado")

            /* Activar Usuario Motorizado */
            foundUser.isBlocked = false;

            FoundRequestDriver.status = "Aceptada";
            FoundRequestDriver.reason = reason;

            
            message = "La solicitud de motorizado fue aceptada correctamente";
            break;
        case 'reject':
            if(FoundRequestDriver.status == "Rechazada") {
                message = "La solicitud del motorizado ya fue rechazada."
                break;
            }
            await User.remove({email: FoundRequestDriver.email});
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