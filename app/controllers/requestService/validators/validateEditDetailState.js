const { validateResult } = require("../../../middlewares/utils");
const { check } = require("express-validator");
const detailstate = require("../../../../data/detailStates");
const { images } = require("../../../middlewares/regex")

const validateEditDetailState = [
  check("id")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un Id de Solicitud de Servicio")
    .isMongoId()
    .withMessage("Formato de ID incorrecto."),
  check("detailstate")
    .not()
    .isEmpty()
    .withMessage("Debe ingresar un estado detalle")
    .isIn(detailstate)
    .withMessage(
      "Debe añadir un estado de tipo IdName del Estado Detalle correspondiente"
    ),
  check("paymentCaptures")
    .custom((value, { req }) => {
        let countErrors = 0;
        if(!req.files) return true
        else if(!req.files.paymentCaptures) return true;
        for (i in req.files.paymentCaptures){
          if(images.test(req.files.paymentCaptures[i].mimetype) === false) countErrors +=1;
        } 
        if (countErrors > 0) return false;
        else return true;
      })
      .withMessage(
        "El arreglo con capturas del pago contiene algún documento con formato incorrecto."
      ),
  check("serviceCaptures")
    .custom((value, { req }) => {
      let countErrors = 0;
      if(!req.files) return true
      else if(!req.files.serviceCaptures) return true;
      for (i in req.files.serviceCaptures){
        if(images.test(req.files.serviceCaptures[i].mimetype) === false) countErrors +=1;
      } 
      if (countErrors > 0) return false;
      else return true;
    })
    .withMessage(
      "El arreglo con capturas del servicio contiene algun documento con formato incorrecto."
    ),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateEditDetailState };
