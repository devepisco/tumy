const { RequestService }  = require("../../../models/NewServices");

const findAllDataService = async () => {
    //obtener los datos completos de servicio
    const data = await RequestService.aggregate(
        [
            {
                $lookup:{
                    from: "detalles",
                    localField:"detalle",
                    foreignField:"_id",
                    as: "detalleServicio"   
                }
            },
            {
                $unwind:"$detalleServicio"
            },
            {
                $lookup:{
                    from: "estadodetalles",
                    localField:"estadoDetalle._id",
                    foreignField:"_id",
                    as: "estadoDetalleArray"
                }
            },
            {
                $unwind:"$estadoDetalleArray"
            },
            {
                $lookup:{
                    from: "estadoglobals",
                    localField:"globalState",
                    foreignField:"_id",
                    as: "globalStateArray"
                }
            },
            {
                $unwind:"$globalStateArray"
            },
        ]
    );
    return data;
}
module.exports = { findAllDataService }