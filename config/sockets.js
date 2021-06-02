const { on, emitTo } = require("../app/middlewares/sockets/helpers");
const { getService, getDetailFromId } = require("../app/middlewares/sockets");

const { clientService } = require('./redis');

const socketIO = (io) => {
    on(io, "connection", (socket) => {
      console.log("connection", socket.client.id);

    on(socket, "driver:init", (data) =>{
      socket.join(data);
      console.log("driver asignado",data)
      console.log("Enviado: ",data)
    });

    on(socket, "driver:location", async (data) =>{
      const service = await getService(data)
      socket.emit("driver:service", service)
      clientService.set("Location", data.coordinates);
      clientService.get("Location", function(err, reply){
        console.log(reply)
      });
    }); 
    on(socket, "client:detailService", async(data) => {
      socket.join(data)
      console.log("Escuchando servicio:", data)
      //obtener detalle de servicio x ID
      const detailService = await getDetailFromId(data)
      //socket.emit("client:getDetailService", detailService)
      emitTo(data, "client:getDetailService", detailService)
    });
    on(socket, "disconnect", () => {
        console.log("disconnect");
      });
    });
  };

  module.exports = { socketIO };
