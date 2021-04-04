const crypto = require("crypto");

const secret = process.env.SECRET_KEY;
const algorithm = "aes-256-cbc";
// Key length is dependent on the algorithm. In this case for aes256, it is
// 32 bytes (256 bits).
const key = crypto.scryptSync(secret, "salt", 32);
const iv = Buffer.alloc(16, 0); // Initialization crypto vector

const decrypt = (text = "") => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { decrypt };
