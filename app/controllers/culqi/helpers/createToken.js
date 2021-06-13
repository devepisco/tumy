const { culqiWithPCI } = require("../../../../config/culqi");

const createToken = async (card, email, metadata) => {
  const token = await culqiWithPCI.tokens.createToken({
    ...card,
    ...email,
    metadata,
  });

  return token;
};

module.exports = { createToken };
