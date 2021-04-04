require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const initMongodb = require('./config/mongodb')
const { errorMiddlewarer } = require('./app/middlewares/utils')

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 3000);

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// for parsing json
app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);

// Init all other stuff
app.use(cors());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(helmet());

app.listen(app.get("port"), () => {
  if (process.env.NODE_ENV === "development") {
    // Prints initialization
    console.log("****************************");
    console.log("*    Starting Server");
    console.log(`*    Port: ${process.env.PORT || 3000}`);
    console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`*    Database: MongoDB`);
    console.log("****************************");
  }
  if (process.env.NODE_ENV === "production") {
    // Prints initialization
    console.log(`Server listening on port ${process.env.PORT}`);
  }
});

//Init MongoDB
initMongodb()

//middleware error
app.use(errorMiddlewarer);

module.exports = { app };