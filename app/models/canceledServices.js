const { Schema } = require("mongoose");

const canceledServices = Schema({
    reason:String,
    author:{ type: Schema.Types.ObjectId, ref: User },
    resume:String,
    captures:String,
});