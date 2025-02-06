const express = require("express");
const {
  getInitialCourses,
  getCourses,
  addCourse,
  getCourse,
  addRating,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);
router.get("/course", getCourse);

router.post("/rate", addRating);
router.post("/addcourse", addCourse);

module.exports = router;
