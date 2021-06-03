const { on, emitTo } = require("../app/middlewares/sockets/helpers");
const { getService } = require("../app/middlewares/sockets");
const { clientService } = require('./redis');
const { getDetailFromId } = require("../app/controllers/users/helpers");

const socketIO = (io) => {
    on(io, "connection", (socket) => {
      console.log("connection", socket.client.id);

    on(socket, "driver:init", (data) =>{
      socket.join(data);
      console.log("driver asignado",data)
      console.log("Enviado: ",data)
    });

    on(socket, "driver:location", async (data) =>{
      //const service = await getService(data)
      clientService.get("infoDriver", function(err, reply){
        return reply;
      });
      const infoDriver = JSON.stringify(data)
      socket.emit("driver:service", infoDriver)
      clientService.set("infoDriver", infoDriver);
      clientService.get("infoDriver", function(err, reply){
       console.log(reply)
      });
    }); 
    on(socket, "client:detailService", async(data) => {
      socket.join(data)
      console.log("Escuchando servicio:", data)
      const detailService = await getDetailFromId(data)
      emitTo(data, "client:getDetailService", detailService)
    });
    on(socket, "disconnect", () => {
        console.log("disconnect");
      });
    });
  };

  module.exports = { socketIO };
