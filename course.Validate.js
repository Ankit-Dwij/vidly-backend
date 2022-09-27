const Joi = require("joi");

const validateCourse = (course) => {
  const courseValidation = Joi.object({
    name: Joi.string().min(3).max(28).required(),
  });
  return courseValidation.validate(course);
};

module.exports = validateCourse;
