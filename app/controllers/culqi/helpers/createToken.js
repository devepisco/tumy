const { culqiWithPCI } = require("../../../../config/culqi");

const createToken = async (data) => {
  const token = await culqiWithPCI.tokens.createToken(data);
  return token;
};

module.exports = { createToken };
