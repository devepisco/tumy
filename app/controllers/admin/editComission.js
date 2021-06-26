const { matchedData } = require("express-validator");
const { structure, objSuccess, handleError } = require("../../middlewares/utils");
const { Comissions } = require("../../models/NewServices");

const editComission = structure (async(req,res) => {
    const data = matchedData(req);
    const updatedComission = await Comissions.findByIdAndUpdate(data.id,data,{new:true});
    if(!updatedComission) return handleError(res, 402,"Error al modificar tarifa de comisión")
    res.status(200).json(objSuccess(updatedComission, "Tarifa de comisión modificada correctamente"));
});

module.exports = { editComission}