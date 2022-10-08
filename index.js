const debug = require("debug")("app:startup");
const config = require("config");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
//MIDDLEWARES
const app = express();

//templating engine
app.set("view engine", "pug");

debug("Name : " + config.get("name"));
debug("MAIL : " + config.get("mail-server.host"));
debug("MAIL-PASSWORD : " + config.get("mail-server.password"));

//startup
require("./startup/routes")(app);
require("./startup/db")();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(` ENV: ${process.env.NODE_ENV}`);
  console.log(`🚀 Listening on PORT ${port}...`);
});
