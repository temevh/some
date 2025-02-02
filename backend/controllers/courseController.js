const prisma = require("../prismaClient");

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({ take: 10 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

module.exports = { getCourses };
