const { on } = require("../app/middlewares/sockets");
const { clientService } = require('./redis');
const { Client } = require("@googlemaps/google-maps-services-js");
const { getItem, getItemsWithPagination } = require("../app/middlewares/db");
const { RequestService } = require("../app/models/NewServices");
const RequestDriver = require("../app/models/Driver")
const { maxReachDriver } = require("../app/models/maxReachDriver");


const socketIO = (io) => {
    on(io, "connection", (socket) => {
      console.log("connection", socket.client.id);

    on(socket, "deliverer:init", (data) =>{
      console.log("Enviado: ",data)
    });

    on(socket, "deliverer:location", async (data) =>{
      const client = new Client({});
      let driverLocation = data.split(",");
      
      const dot = await getService(driverLocation,1)
      async function getService(location, page){
        const service = await getItemsWithPagination({page:page, limit:1},{},RequestService);
        const originService = service.docs[0].origin.coordinates.split(",");
        let distanceServiceDriver = await client.distancematrix({
          params: {
              origins:[{lat:originService[0].trim(),lng:originService[1].trim()}],
              destinations:[{ lat:location[0].trim(),lng:location[1].trim()}],
              key: "AIzaSyD5JTFO1uOStRPY1Faat10O6b_gWz9e3BQ",
          }}).then((r) => {
          distancia = parseFloat(r.data.rows[0].elements[0].distance.text);
          return distancia;})
        const maxReach = await getItem("60b1e2804a1fb73e3871d729", maxReachDriver)
        if(distanceServiceDriver <= maxReach.number) return service
        else {
          if(page < service.totalDocs) return getService(location, service.page + 1 )
          else false
        }
      }

      socket.emit("driver:service", dot.docs[0])
      clientService.set("Location", data);
      clientService.get("Location", function(err, reply) {
        console.log("Location:",reply);
    });
    });

    on(socket, "disconnect", () => {
        console.log("disconnect");
      });
    });
  };

  module.exports = { socketIO };
