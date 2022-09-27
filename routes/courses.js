const express = require("express");
const router = express.Router();
const courses = require("../db");
const validateCourse = require("../course.Validate");

router.get("/", (req, res) => {
  res.send(courses);
});
//route params && query strings
router.get("/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);
  if (!course)
    return res.status(404).send("The course with given id was not found");
  res.send(course);
});

//POST & INPUT VALIDATION
router.post("/", (req, res) => {
  const { error } = validateCourse({ name: req.body.name });
  if (error) return res.status(400).send(error.message);

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
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
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);
  if (!course) return res.status(404).send("Not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
