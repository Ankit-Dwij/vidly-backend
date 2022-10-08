const buildDevLogger = require("./dev-logger");
const buildProdLogger = require("./prod-logger");

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
  console.log("Winston is logging in dev...");
} else {
  logger = buildProdLogger();
}

module.exports = logger;
