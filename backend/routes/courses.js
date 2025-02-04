const express = require("express");
const {
  getInitialCourses,
  getCourses,
  addCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);
router.post("/addcourse", addCourse);

module.exports = router;
