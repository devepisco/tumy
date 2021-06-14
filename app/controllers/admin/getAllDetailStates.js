const { objSuccess } = require('../../middlewares/utils');
const { DetailState } = require('../../models/NewServices');
const getAllDetailStates = async (req, res) => {
    const detailStates = await DetailState.find();
    res.status(200).json(objSuccess(detailStates));
}
module.exports = {getAllDetailStates}