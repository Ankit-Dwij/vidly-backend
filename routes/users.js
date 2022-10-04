const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (ex) {
    res.send(ex);
    console.log(ex);
  }
});

router.post("/login", async (req, res) => {});

module.exports = router;
