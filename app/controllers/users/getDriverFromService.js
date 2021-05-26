const { structure, objSuccess, isIDGood } = require("../../middlewares/utils");
const { RequestService } = require("../../models/NewServices");
const { User } = require("../../models/User");
const mongoose = require('mongoose');

const getDriverFromService = structure( async (req, res) => {
    const IdService = isIDGood(req.params.id);
    const foundService = await RequestService.aggregate([
        {
            $lookup:{
                from: User.collection.name,
                localField:'driverUser',
                foreignField:'_id',
                as:'driverUser'
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(IdService)
            }
        },
        {
            $project:{
                driverUser:1
            }
        }
    ]);
    res.status(200).json(objSuccess(foundService));
});

module.exports = { getDriverFromService }