const { structure, objSuccess } = require("../../middlewares/utils");
const { maxReachDriver } = require("../../models/maxReachDriver");

const editMaxReachService = structure(async (req, res) => {
  let data = await maxReachDriver.findOne();
  const response = await maxReachDriver.findByIdAndUpdate(
    data._id,
    {number: req.params.value},
    { new: true }
  );
  response ? (res
    .status(200)
    .json(
      objSuccess(
        {},
        "Se edito correctamente el valor de Alcance máximo de un pedido."
      )
    )): handleError(res,400,"Error al actualizar el valor del alcance maximo.");
});
module.exports = { editMaxReachService };
