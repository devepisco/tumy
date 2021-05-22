const { structure, objSuccess } = require("../../middlewares/utils");
const { RequestService, GlobalState,  }  = require("../../models/NewServices");

const getAllDataServices = structure (async(req, res) =>{
    //obtener parametros fecha de inicio, fecha fin, estado de detalle, estado global
    
    const beginDate = req.query.fechaInicio;
    let endDate = req.query.fechaFin;
    const globalState = req.query.estadoGlobal;
    let data = {}
    // si se ingresan los 3 filtros de busqueda o solo 1 fecha y estado global
    if(beginDate && endDate && globalState || beginDate && !endDate && globalState){
        if(!endDate) endDate = new Date(beginDate).valueOf() + 24*60*60000;
        else endDate = new Date(endDate).valueOf() + 24*60*60000;
        data = await RequestService.aggregate([
            {
                $lookup:{
                    from: GlobalState.collection.name,
                    localField:'globalState',
                    foreignField:'_id',
                    as:'globalState'
                },
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects:[{
                                $arrayElemAt:['$globalState',0]
                            },
                            "$$ROOT"
                        ]
                    }
                }
            },
            {
                $project:{
                    _id:1,
                    origenDireccion:1,
                    destinoDireccion:1,
                    IdName:1,
                    stateName:1,
                    createdAt:1,
                    updatedAt:1
                }
            },
            {
                $match:{
                    createdAt:{
                        $gte: new Date(beginDate),
                        $lt: new Date(endDate)
                    },
                    IdName:globalState
                }
            }
        ]);

    // si se ingresan solo las fechas o solo una fecha
    }else if(beginDate && endDate && !globalState || beginDate && !globalState && !endDate){
        if(!endDate) endDate = new Date(beginDate).valueOf() + 24*60*60000;
        else endDate = new Date(endDate).valueOf() + 24*60*60000;
        data = await RequestService.aggregate([
            {
                $lookup:{
                    from: GlobalState.collection.name,
                    localField:'globalState',
                    foreignField:'_id',
                    as:'globalState'
                },
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects:[{
                                $arrayElemAt:['$globalState',0]
                            },
                            "$$ROOT"
                        ]
                    }
                }
            },
            {
                $project:{
                    _id:1,
                    origenDireccion:1,
                    destinoDireccion:1,
                    IdName:1,
                    stateName:1,
                    createdAt:1,
                    updatedAt:1
                }
            },
            {
                $match:{
                    createdAt:{
                        $gte: new Date(beginDate),
                        $lte: new Date(endDate)
                    }
                }
            }
        ]);

    // si se ingresa solo el estado global
    }else if(globalState && !beginDate && !endDate){
        data = await RequestService.aggregate([
            {
                $lookup:{
                    from: GlobalState.collection.name,
                    localField:'globalState',
                    foreignField:'_id',
                    as:'globalState'
                },
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects:[{
                                $arrayElemAt:['$globalState',0]
                            },
                            "$$ROOT"
                        ]
                    }
                }
            },
            {
                $project:{
                    _id:1,
                    origenDireccion:1,
                    destinoDireccion:1,
                    IdName:1,
                    stateName:1,
                    createdAt:1,
                    updatedAt:1
                }
            },
            {
                $match:{
                    IdName:globalState
                }
            }

        ]);
    
    // si no mandas nada o cualquier otro parametro 
    }else if(!beginDate && !endDate && !globalState){
        console.log("Se realizó una consulta sin filtros");
        data = await RequestService.aggregate([
            {
                $lookup:{
                    from: GlobalState.collection.name,
                    localField:'globalState',
                    foreignField:'_id',
                    as:'globalState'
                },
            },
            {
                $replaceRoot:{
                    newRoot:{
                        $mergeObjects:[{
                                $arrayElemAt:['$globalState',0]
                            },
                            "$$ROOT"
                        ]
                    }
                }
            },
            {
                $project:{
                    _id:1,
                    origenDireccion:1,
                    destinoDireccion:1,
                    IdName:1,
                    stateName:1,
                    createdAt:1,
                    updatedAt:1
                }
            },

        ]);
    }
    res.status(200).json(objSuccess(data));
});
 
module.exports = { getAllDataServices }