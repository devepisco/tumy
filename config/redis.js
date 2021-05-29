const redis = require('redis');
const clientService = redis.createClient();

clientService.on('connect', function(){
    console.log('Connected to Redis');
  });
  clientService.on('error', function(err) {
    console.log('Redis error: ' + err);
  });

//   client.set("key", "value", redis.print);
//   client.get("key", redis.print);

module.exports = { clientService }