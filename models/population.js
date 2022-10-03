const mongoose = require("mongoose");

//MODELLING RELATIONSHIPS
const courseSchema = new mongoose.Schema({
  name: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  Gender: String,
});

const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { Author, Course };
