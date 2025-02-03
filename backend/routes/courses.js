const express = require("express");
const { getInitialCourses } = require("../controllers/courseController");

const router = express.Router();

router.get("/", getInitialCourses);

module.exports = router;
