const { Schema, model } = require("mongoose");
const mongoosePaginateV2 = require("mongoose-paginate-v2");

let maxReachDriverSchema = new Schema({
    number: Number
});
const maxReachDriver = model('maxReachDriver', maxReachDriverSchema);

maxReachDriverSchema.plugin(mongoosePaginateV2);

module.exports = {maxReachDriver}
