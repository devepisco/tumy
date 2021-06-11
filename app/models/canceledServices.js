const { Schema, model } = require("mongoose");
const { User } = require("./User");
const { RequestService } = require("./NewServices");
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
    coordinates:{
        type:String
    },
    captures:[{
        type: String
    }],
    service:{
        type: Schema.Types.ObjectId, 
        ref: RequestService
    }
});
const CanceledServices = model('CanceledServices', canceledServicesSchema);
module.exports = { CanceledServices }