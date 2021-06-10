const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils");
const { CanceledServices } = require("../../models/CanceledServices");
const { RequestService } = require("../../models/NewServices");
const { findDetailState } = require("../users/helpers");

const driverCancelService = structure( async (req, res) => {
    const { id, whoseProblem, reason, resume } = matchedData(req);
    const foundService = await RequestService.findById(id);
    if(!foundService) return handleError(res, 404, "No se encontró la solicitud de servicio");

    const newCanceledService = new CanceledServices({
        creatorUser: req.user._id,
        whoseProblem: whoseProblem,
        resume: resume
    });
    if (req.files) {
        for (i in req.files.cancelationCaptures) {
            newCanceledService.captures.push(req.files.cancelationCaptures[i].filename);
        }
    }
    await newCanceledService.save()

    let DetailState = await findDetailState("cancelado");
    DetailState.obs = reason;
    foundService.detailState.push(DetailState)
    console.log(foundService.detailState)
    await foundService.save();
    res.status(200).json(objSuccess({},"El servicio fue correctamente reportado como cancelado"))
});
module.exports = { driverCancelService }