const { objSuccess } = require('../../middlewares/utils');
const { RequestService, Comissions} = require('../../models/NewServices');
const { findGlobalState } = require('../users/helpers');
const setComissions = async(req, res) => {
    const Comission = await Comissions.findOne();
    const globalState = await findGlobalState('entregado');
    const services = await RequestService.find({globalState:globalState._id});
    for(i in services){
        services[i].detail.comission= { 
            _id : Comission._id,
            amount : Comission.amount* services[i].costo
        }
    }
    res.status(200).json(objSuccess(services,"Registros actualizados correctamente"));
}
module.exports = {setComissions}