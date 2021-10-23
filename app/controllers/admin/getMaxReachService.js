const { structure, objSuccess} =  require('../../middlewares/utils');
const { maxReachDriver} = require('../../models/maxReachDriver');

const getMaxReachService = structure(async(req, res) => {
    const data = await maxReachDriver.find();
    res.status(200).json(objSuccess(data));
});
module.exports = { getMaxReachService };
