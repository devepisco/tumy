const { Schema, model } = require("mongoose");
const { User } = require("./User");

const canceledServicesSchema = Schema({
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
const CanceledServices = model('CanceledServices', canceledServicesSchema);
module.exports = { CanceledServices }