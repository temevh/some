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

const getCourse = async (req, res) => {
  const { code } = req.query;
  console.log("Getting course:", code);

  try {
    const courseInfo = await prisma.course.findUnique({
      where: { code: code },
      include: { ratings: true, comments: true },
    });

    if (!courseInfo) {
      return res.status(404).json({ error: "Course not found" });
    }

    const ratings = courseInfo.ratings;
    const totalRatings = ratings.length;

    const averageRating = totalRatings
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings
      : null;

    const averageTeaching = totalRatings
      ? ratings.reduce((acc, r) => acc + r.teaching, 0) / totalRatings
      : null;

    const averageDifficulty = totalRatings
      ? ratings.reduce((acc, r) => acc + r.difficulty, 0) / totalRatings
      : null;

    const averageWorkload = totalRatings
      ? ratings.reduce((acc, r) => acc + r.workload, 0) / totalRatings
      : null;

    const course = {
      name: courseInfo.name,
      code: courseInfo.code,
      school: courseInfo.school,
      lastUpdate: courseInfo.updatedAt,
      rating: averageRating?.toFixed(1) || "Ei vielä arvosteluja",
      teaching: averageTeaching?.toFixed(1) || "Ei vielä arvosteluja",
      difficulty: averageDifficulty?.toFixed(1) || "Ei vielä arvosteluja",
      workload: averageWorkload?.toFixed(1) || "Ei vielä arvosteluja",
      comments: courseInfo.comments,
    };

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

//Add course (if not already in db)
const addCourse = async (req, res) => {
  try {
    const { name, code, school } = req.body;
    console.log("adding course:", name, school, code);

    if (!name || !code || !school) {
      return res
        .status(400)
        .json({ message: "Kaikki kentät ovat pakollisia!" });
    }

    const exists = await prisma.course.findFirst({
      where: {
        OR: [{ name }, { code }],
      },
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Kurssi näyttäisi jo löytyvän tietokannasta!" });
    }

    const newCourse = await prisma.course.create({
      data: { code, name, school },
    });

    res
      .status(200)
      .json({ message: "Kurssi lisätty onnistuneesti!", newCourse });
  } catch (err) {
    console.log("error adding course", err);
    res.status(500).json({ message: "Virhe kurssin lisäämisessä :(" });
  }
};

module.exports = { getInitialCourses, getCourses, addCourse, getCourse };
