const Culqi = require("culqi-node");

const { CULQI_PUBLIC_KEY, CULQI_PRIVATE_KEY } = process.env;

const culqi = new Culqi({
  privateKey: CULQI_PRIVATE_KEY,
});

const culqiWithPCI = new Culqi({
  privateKey: CULQI_PRIVATE_KEY,
  pciCompliant: true,
  publicKey: CULQI_PUBLIC_KEY,
});

module.exports = { culqi, culqiWithPCI };
