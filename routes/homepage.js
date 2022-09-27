const express = require("express");
const router = express.Router();

//GET
router.get("/", (req, res) => {
  res.send("Hello World");
});
//VIEWS (pug)
router.get("/views", (req, res) => {
  res.render("index", { title: "Sample Views page", message: "Hello World" });
});

module.exports = router;
