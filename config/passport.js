const passport = require("passport"),
  { decrypt } = require('../app/middlewares/crypto')
  User = require("../app/models/User"),
  passportJWT = require("passport-jwt"),
  JWTStrategy = passportJWT.Strategy;

  const jwtExtractor = (req) => {
    let token = null
    if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.body.token) {
      token = req.body.token.trim()
    } else if (req.query.token) {
      token = req.query.token.trim()
    }
    if (token) {
      // Decrypts token
      token = decrypt(token)
    }
    return token
  }
  

const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  User.findById(jwtPayload.data._id, (err, user) => {
    if (err) {
      return cb(err, false);
    }
    return !user ? cb(null, false) : cb(null, user);
  });
});

passport.use(jwtLogin);
