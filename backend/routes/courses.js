const express = require("express");
const {
  getInitialCourses,
  getCourses,
  addCourse,
  getCourse,
  addRating,
  getMoreComments,
} = require("../controllers/courseController");
const {
  reviewLimiter,
  reviewLimiterCourseAdding,
} = require("../middleware/ratelimit");
const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);
router.get("/course", getCourse);
router.get("/comments", getMoreComments);

router.post("/rate", reviewLimiter, addRating);
router.post("/addcourse", reviewLimiterCourseAdding, addCourse);

module.exports = router;
