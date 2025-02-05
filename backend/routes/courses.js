const express = require("express");
const {
  getInitialCourses,
  getCourses,
  addCourse,
  getCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);
router.post("/addcourse", addCourse);
router.get("/course", getCourse);

module.exports = router;
