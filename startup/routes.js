const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const error = require("../middlewares/error");
const courses = require("../routes/courses");
const users = require("../routes/users");
const home = require("../routes/homepage");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  // app.use(logger);
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan Enabled...");
  }

  //routes
  app.use("/api/courses", courses);
  app.use("/api/users", users);
  app.use("/", home);

  app.use(error);
};
