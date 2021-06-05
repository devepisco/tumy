const { on, emitTo } = require("../app/middlewares/sockets/helpers");
const { clientService } = require('./redis');
const { getDetailFromId, getService } = require("../app/controllers/users/helpers");
const { editInfoDriver } = require("./helpers/editInfoDriver");
const { finishServiceDriver } = require("./helpers/finishServiceDriver");

const socketIO = (io) => {
    on(io, "connection", (socket) => {
      console.log("connection", socket.client.id);

    on(socket, "driver:init", (data) =>{
      socket.join(data);
      console.log("driver asignado", data)
    });

    on(socket, "driver:service", async (data) =>{
      const service = await getService()
      if(service){
        socket.emit("driver:service", service)
       }else {
        socket.emit("driver:service", false)
       }
      // clientService.get("infoDriver", function(err, reply){
      //   const infoDriver = editInfoDriver(reply, data)
      //   console.log("Actualizando estado del conductor", infoDriver)
      //   clientService.set("infoDriver", infoDriver)
      // });
    }); 

    on(socket, "driver:location", async(data) => {
      clientService.get("infoDriver", function(err, reply){
        data.isAvaliable = true;
        const infoDriver = editInfoDriver(reply, data)
        clientService.set("infoDriver", infoDriver)
      });
      socket.emit("driver:location", data)
    });

    on(socket, "client:detailService", async(data) => {
      socket.join(data)
      console.log("Escuchando servicio:", data)
      const detailService = await getDetailFromId(data)
      emitTo(data, "client:getDetailService", detailService)
    });

    //on para remover de redis "driver:end"
    on(socket,"driver:end", async(data)=>{
      clientService.get("infoDriver", function(err, reply){
        const infoDriver = finishServiceDriver(reply, data)
        clientService.set("infoDriver", infoDriver)
      });
    })

    on(socket, "disconnect", () => {
        console.log("disconnect");
      });
    });
  };

  module.exports = { socketIO };
