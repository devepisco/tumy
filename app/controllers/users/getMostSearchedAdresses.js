const { structure, objSuccess } = require("../../middlewares/utils");
const { RequestService } = require("../../models/NewServices");
const mongoose = require("mongoose");

const getMostSearchedAdresses = structure(async (req, res) => {
  const userId = req.user._id;
  const place = req.params.place;
  const data = await RequestService.aggregate([
    {
      $match: {
        creatorUser: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: place == 'origin'? "$origin" : "$destination",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    { $limit: 5 },
  ]);
  
  res.status(200).json(objSuccess(data));
});
module.exports = { getMostSearchedAdresses };
