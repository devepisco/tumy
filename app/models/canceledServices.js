const { Schema } = require("mongoose");
const { User } = require("../models/User");

const canceledServices = Schema({
    creatorUser:{ 
        type: Schema.Types.ObjectId, 
        ref: User 
    },
    whoseProblem:{
        type: String,
        enum: ["user", "driver"],
        default: null
    },
    reason:{
        type: String
    },
    resume:{
        type: String
    },
    captures:[{
        type: String
    }],
});

module.exports = { canceledServices }