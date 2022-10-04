const express = require("express");
const router = express.Router();
// const courses = require("../db");
const validateCourse = require("../course.Validate");
const Course = require("../models/courseSchema");

router.get("/", async (req, res) => {
  const courses = await Course
    .find
    // .find({price : {$gt:10}}) // query using logical operator gt(greater than) - tutorial 091

    // { author: /.*mosh$/i } REGEX
    ()
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
  if (!courses) return res.status(404).message("Courses not found");
  res.send(courses);
});

//route params && query strings
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("Course with given id was not found");

  res.status(200).send(course);
});

//POST & INPUT VALIDATION
router.post("/", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error);

  // const course = { id: courses.length + 1, name: req.body.name };
  const course = new Course({
    name: req.body.name,
    author: req.body.author,
    tags: req.body.tags,
    isPublished: req.body.isPublished,
  });
  const result = await course.save();
  // courses.push(course);
  res.send(result);
});

//PUT
router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was not found");

  const { error } = validateCourse({ name: req.body.name });
  if (error) return res.status(400).send(error.message);

  course.name = req.body.name;
  res.send(course);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const result = await Course.deleteOne({ _id: req.paramsid });
  // const result = await Course.findByIdAndRemove({ req.params.id });
  if (!result) return res.status(404).send("not found");

  res.status(200).send(result);
});

module.exports = router;
