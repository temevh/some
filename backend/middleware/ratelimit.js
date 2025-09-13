const rateLimit = require("express-rate-limit");

const reviewLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3, //max 3 reviews in 10 minutes
  message:
    "Too many reviews submitted. Please wait a few minutes before trying again.",
  standardHeaders: true,
  legacyHeaders: false,
});

const reviewLimiterCourseAdding = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3, //max 3 reviews in 24 hours
  message: "Please wait a moment before adding more courses",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { reviewLimiter, reviewLimiterCourseAdding };
