const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = new mongoose.model("User", userSchema);

//VALIDATION

const validateUser = (user) => {
  const userValidation = Joi.object({
    name: Joi.string().min(3).max(28).required(),
    email: Joi.string().min(7).max(28).required(),
    password: Joi.string().min(6).max(15).required(),
  });
  return userValidation.validate(user);
};

module.exports = { User, validateUser };
