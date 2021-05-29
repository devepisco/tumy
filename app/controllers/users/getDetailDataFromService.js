const { structure, objSuccess, isIDGood } = require("../../middlewares/utils");
const { RequestService } = require("../../models/NewServices");

const getDetailDataFromService = structure( async (req, res) => {

    const IdService = isIDGood(req.params.id);
    const data = await RequestService.findOne({ _id : IdService},{__v:0}).populate('detailState._id',{_id:0,IdName:0,__v:0}).populate('globalState',{_id:0,IdName:0,__v:0});
    res.status(200).json(objSuccess(data));
});

module.exports = { getDetailDataFromService }