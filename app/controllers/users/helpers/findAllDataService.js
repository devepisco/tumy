const ServiceModel  = require("../../../models/NewServices");

const findAllDataService = async () => {
    //obtener los datos completos de servicio
    const data = await ServiceModel.SolicitudServicio.aggregate(
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
                    localField:"estadoGlobal",
                    foreignField:"_id",
                    as: "estadoGlobalArray"
                }
            },
            {
                $unwind:"$estadoGlobalArray"
            },
        ]
    );
    return data;
}
module.exports = { findAllDataService }


/**
 * 
 *  const data = await NewServiceTemplate.SolicitudServicio.aggregate(
                [
                    {
                        $lookup:{
                            from: "estadodetalles",
                            localField:"_id",
                            foreignField:"servicio",
                            as: "estadoDetalleArray"
                        }
                    },
                    {
                        $unwind:"$estadoDetalleArray"
                    }
                ]
            );
 */