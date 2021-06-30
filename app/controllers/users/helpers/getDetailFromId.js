const { isIDGood } = require("../../../middlewares/utils");
const { RequestService } = require("../../../models/NewServices")

const getDetailFromId = async (id) => {
    const IdService = isIDGood(id);
    const data = await RequestService.findOne({ _id : IdService},{__v:0})
        .populate('detailState._id',{_id:0,IdName:0,__v:0})
        .populate('globalState',{_id:0,IdName:0,__v:0})
        .populate('detail.driverUser',{firstname:1,lastname:1});
    return data;
}
module.exports = { getDetailFromId } 