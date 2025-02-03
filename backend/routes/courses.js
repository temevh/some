const express = require("express");
const {
  getInitialCourses,
  getCourses,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/initial", getInitialCourses);
router.get("/filtered", getCourses);

module.exports = router;
