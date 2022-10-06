const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const logger = require("./middlewares/logger");
const courses = require("./routes/courses");
const users = require("./routes/users");
const home = require("./routes/homepage");
//MIDDLEWARES
const app = express();

//templating engine
app.set("view engine", "pug");
// app.set("views", "./views"); //DEFAULT VALUE

//startup-middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(logger);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled...");
}

//routes
app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/", home);

debug("Name : " + config.get("name"));
debug("MAIL : " + config.get("mail-server.host"));
debug("MAIL-PASSWORD : " + config.get("mail-server.password"));

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    debug("MongoDb Connected...");
  })
  .catch((err) => debug(`Error: ${err}`));

app.listen(port, () => {
  console.log(` ENV: ${process.env.NODE_ENV}`);
  console.log(`🚀 Listening on PORT ${port}...`);
});
