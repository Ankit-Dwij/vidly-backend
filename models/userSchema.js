const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 28 },
  email: { type: String, required: true, unique: true, min: 3, max: 28 },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};

const User = new mongoose.model("User", userSchema);

//VALIDATION

const validateUser = (user) => {
  const userValidation = Joi.object({
    name: Joi.string().min(3).max(28).required(),
    email: Joi.string().min(7).max(28).required().email(),
    password: Joi.string().min(6).max(15).required(),
  });
  return userValidation.validate(user);
};

const validateLogin = (req) => {
  const loginValidation = Joi.object({
    email: Joi.string().min(7).max(28).required().email(),
    password: Joi.string().min(6).max(15).required(),
  });
  return loginValidation.validate(req);
};

module.exports = { User, validateUser, validateLogin };
