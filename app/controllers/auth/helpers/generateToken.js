const jwt = require("jsonwebtoken");
const { encrypt } = require("../../../middlewares/crypto");

const generateToken = (userId = "") => {
  try {
    const date = Date.now();
    // Gets expiration time
    const expiration = Math.floor(
      date / 1000 + 60 * process.env.JWT_EXPIRATION_IN_MINUTES
    ); //seconds

    const millisExpiredTime = expiration * 1000;
    const expiredDate = new Date(millisExpiredTime);

    // returns signed and encrypted token
    const tokenObj = {
      access_token: encrypt(
        jwt.sign(
          {
            data: {
              _id: userId,
            },
            exp: expiration,
          },
          process.env.JWT_SECRET
        )
      ),
      expired_in: millisExpiredTime,
      expired_date: expiredDate,
    };
    return tokenObj;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateToken };
