const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");
const users = require("../../../../data/users");
const  driverReasons = require("../../../../data/driverCancelationReasons");
const  userReasons = require("../../../../data/userCancelationReasons");
const { images } = require("../../../middlewares/regex");

const validateDriverCancelService = [
    check("id")
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un Id de Solicitud de Servicio")
        .isMongoId()
        .withMessage("Formato de ID incorrecto."),
    check('whoseProblem')
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un tipo de usuario, que origina el problema.")
        .isIn(users)
        .withMessage("Debe añadir un tipo de usuario entre user/driver"),
    check("reason")
        .not()
        .isEmpty()
        .withMessage("Debe ingresar una razon de la cancelación del servicio.")
        .isIn([...userReasons, ...driverReasons])
        .withMessage("Debe añadir una razon válida registrada."),
    check("resume")
        .not()
        .isEmpty()
        .withMessage("Debe ingresar un resumen de la cancelación del servicio.")
        .isString(),
    check('coordinates')
        .not()
        .isEmpty()
        .withMessage('Debe añadir las coordenadas de motorizado'),
    check("cancelationCaptures")
        .custom((value, { req }) => {
            let countErrors = 0;
            if(!req.files) return true
            else if(!req.files.cancelationCaptures) return true;
            for (i in req.files.cancelationCaptures){
            if(images.test(req.files.cancelationCaptures[i].mimetype) === false) countErrors +=1;
            } 
            if (countErrors > 0) return false;
            else return true;
        })
        .withMessage(
            "El arreglo con capturas de la cancelacion del servicio contiene algun documento con formato incorrecto."
        ),
    (req, res, next) => {
        validateResult(req, res, next);
    },
]
module.exports = { validateDriverCancelService };