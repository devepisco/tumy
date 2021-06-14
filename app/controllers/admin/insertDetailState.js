const { DetailState } = require("../../models/NewServices");
const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils")
const insertDetailState = structure(async (req, res) => {
    const {IdName, stateName } = matchedData(req)
    const newDetailState = new DetailState({
        IdName:IdName,
        stateName:stateName
    })
    await newDetailState.save();
    res.status(200).json(objSuccess(newDetailState));
});
module.exports = {insertDetailState}