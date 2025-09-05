const express = require("express");
const {
  getInitialCourses,
  getCourses,
  addCourse,
  getCourse,
  addRating,
  getMoreComments
} = require("../controllers/courseController");

const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);
router.get("/course", getCourse);
router.get("/comments", getMoreComments);

router.post("/rate", addRating);
router.post("/addcourse", addCourse);

module.exports = router;
