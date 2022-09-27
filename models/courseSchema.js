const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  iSPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
