const { matchedData } = require("express-validator");
const { structure, objSuccess } = require("../../middlewares/utils");
const https = require("https");

const sendNotification = structure(async (req, res) => {
  const data = matchedData(req);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj",
  };

  const options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers,
  };

  var request = https.request(options, function (resp) {
    resp.on("data", function (data) {
      console.log("Response:");
      console.log(JSON.parse(data));
      res
        .status(200)
        .json(
          objSuccess(data, "Notificacion de One Signal enviada exitosamente.")
        );
    });
  });

  request.on("error", function (e) {
    console.log("ERROR:");
    console.log(e);
    res
        .status(400)
        .json(
          objSuccess(e, "Hubo un error al enviar la notificacion.")
        );
  });

  request.write(JSON.stringify(data));
  request.end();
});

module.exports = { sendNotification };
