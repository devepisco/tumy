const { matchedData } = require("express-validator");
const { structure, objSuccess, handleError } = require("../../middlewares/utils");
const { CanceledServices } = require("../../models/CanceledServices");
const { RequestService } = require("../../models/NewServices");
const { findDetailState } = require("../users/helpers");

const driverCancelService = structure( async (req, res) => {
    const { id, whoseProblem, reason, resume, coordinates } = matchedData(req);
    const foundService = await RequestService.findById(id);
    if(!foundService) return handleError(res, 404, "No se encontró la solicitud de servicio");
//reaprtidor servicio reasignado {obs : reason}
//cliente -> entrega finalizada {obs : reason}
    // let foundDetailState = await findDetailState("cancelado");
    // let existDetailState = foundService.detailState.find(
    //     (state) => state._id == `${foundDetailState._id}`
    //   );
    // if (existDetailState)
    //     return handleError(
    //       res,
    //       400,
    //       "La solicitud de servicio ya se encuentra en estado: " +
    //         foundDetailState.stateName
    //     );
    foundDetailState.obs = reason;
    foundService.detailState.push(foundDetailState)
    const newCanceledService = new CanceledServices({
        creatorUser: req.user._id,
        whoseProblem: whoseProblem,
        resume: resume,
        coordinates: coordinates, 
        service:id
    });
    if (req.files) {
        for (i in req.files.cancelationCaptures) {
            newCanceledService.captures.push(req.files.cancelationCaptures[i].filename);
        }
    }
    await newCanceledService.save();
    await foundService.save();
    res.status(200).json(objSuccess({},"El servicio fue correctamente reportado como cancelado"))
});
module.exports = { driverCancelService }