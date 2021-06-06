const redis = require("redis");
const clientService = redis.createClient();

clientService.on("connect", function () {
  console.log(`*    Redis Connection: OK\n****************************`);
});
clientService.on("error", function (err) {
  console.log(
    `*    Error connecting to Redis: ${err}\n****************************`
  );
});

//   client.set("key", "value", redis.print);
//   client.get("key", redis.print);

module.exports = { clientService };
