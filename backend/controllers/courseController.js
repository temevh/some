const prisma = require("../prismaClient");

// Fetch latest 15 courses
const getInitialCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      take: 15,
      orderBy: { updatedAt: "desc" },
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Fetch courses filtered by school
const getCourses = async (req, res) => {
  const { school } = req.query;
  let courses;
  try {
    console.log("Getting courses for school:", school);
    if (school === "") {
      courses = await prisma.course.findMany({});
    } else {
      courses = await prisma.course.findMany({
        where: {
          school: school,
        },
      });
    }
    console.log("Got courses:", courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

const addCourse = async (req, res) => {
  const { course } = req.query;
  try {
    console.log("adding course:", course);
    const exists = await prisma.course.findFirst({
      where: {
        OR: [
          {
            name: course.name,
          },
          { code: course.code },
        ],
      },
    });
    if (exists) {
      res
        .status(400)
        .json({ message: "Kurssi näyttäisi jo löytyvän tietokannasta!" });
    } else {
      await prisma.course.create({
        data: { name: course.name, code: course.code, school: course.school },
      });
      res.status(200).json({ message: "Kurssi lisätty onnistuneesti" });
    }
  } catch (err) {
    console.log("error");
    res.status(500).json({ message: "Virhe kurssin lisäämisessä :(" });
  }
};

module.exports = { getInitialCourses, getCourses, addCourse };
