const { structure, objSuccess, isIDGood, handleError } = require("../../middlewares/utils");
const { RequestService } = require("../../models/NewServices");

const getDetailDataFromService = structure( async (req, res) => {

    const IdService = isIDGood(req.params.id);
    const FoundService = await RequestService.findById(IdService)
    if(!FoundService) return handleError(res, 404, "No se encontró la solicitud de servicio");
    const data = await RequestService.findOne({ _id : IdService},{__v:0})
        .populate('detailState._id',{_id:0,IdName:0,__v:0})
        .populate('globalState',{_id:0,IdName:0,__v:0})
        .populate('detail.driverUser',{firstname:1, lastname: 1});
    res.status(200).json(objSuccess(data));
});

module.exports = { getDetailDataFromService }