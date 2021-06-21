const { structure, objSuccess, isIDGood, handleError } = require("../../middlewares/utils");
const RequestDriver = require("../../models/DriverRequests")

const rejectRequestDriver = structure(async(req, res) => {
    idDriver = isIDGood(req.params.id);
    if(!idDriver) return handleError(res,"El Id de Solicitud de motorizado tiene un formato incorrecto",400);
    const dataRequestDriver = {
        status : "Rechazado",
        reason : "La documentación no es verídica"
    }
    const FoundRequestDriver = await RequestDriver.findByIdAndUpdate(idDriver, dataRequestDriver, {new:true});
    res.status(200).json(objSuccess(FoundRequestDriver,"La solicitud de motorizado fue rechazada"))
});

module.exports = { rejectRequestDriver }