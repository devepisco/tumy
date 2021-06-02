const { structure, isIDGood, handleError, objSuccess } = require("../../middlewares/utils");
const { findDetailState } = require("../users/helpers/findDetailState")
const { RequestService } = require("../../models/NewServices");
const { emitToUpdateService } = require("../../middlewares/sockets");


const  editDetailState = structure(async (req, res) => {
    const IdRequestService = isIDGood(req.params.id);
    if(!IdRequestService) return handleError({},400, "El formato de Id es incorrecto.")
    const detailState = await findDetailState(req.params.detailstate);
    const requestService = await RequestService.findById(IdRequestService)
    requestService.detailState.push({_id:detailState._id})
    const result = await requestService.save()
    await result.populate('detailState._id').execPopulate()
    emitToUpdateService(requestService.detail.driverUser, requestService._id, requestService)
    return res.status(200).json(objSuccess({},"El estado Detalle se actualizó correctamente"))
});
module.exports = { editDetailState }