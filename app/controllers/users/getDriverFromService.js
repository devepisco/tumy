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
                localField:'detail.driverUser',
                foreignField:'_id',
                as:'driverUser'
            }
        },
        {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  {
                    $arrayElemAt: ["$driverUser", 0],
                  },
                  "$$ROOT",
                ],
              },
            },
          },
        {
            $match:{
                _id: mongoose.Types.ObjectId(IdService)
            }
        },
        {
            $project:{
                firstname:1,
                lastname:1,
                role:1,
                IDType:1,
                IDNumber:1,
                SOATNumber:1,
                VehicleRegistration:1,
                propertyCardNumber:1,
                phone:1,
                email:1,
                createdAt:1,
                updatedAt:1
            }
        }
    ]);
    res.status(200).json(objSuccess(foundService));
});

module.exports = { getDriverFromService }