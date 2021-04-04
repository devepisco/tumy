const express = require("express");
const router = express.Router();
const fs = require("fs");
const routesPath = `${__dirname}/`;
const {
  handleError,
  removeExtensionFromFile,
} = require("../middlewares/utils");

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file);
  // Prevents loading of this file and auth file
  return routeFile !== "index"
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : "";
});

/*
 * Handle 404 error
 */
router.use("*", (req, res) => {
  return handleError(res, 404, "No se encontro la url");
});

module.exports = router;
