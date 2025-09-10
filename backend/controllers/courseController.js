const prisma = require("../prismaClient");
const { checkSentiment, reviewLimiter } = require("../middleware/sentiment");

// Fetch latest 20 courses
const getInitialCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      take: 20,
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
  const { school, searchTerm } = req.query;
  try {
    const courses = await prisma.course.findMany({
      where: {
        school: school || undefined,
        OR: searchTerm
          ? [
              { name: { contains: searchTerm } },
              { code: { contains: searchTerm } },
            ]
          : undefined,
      },
      take: 30,
      orderBy: { updatedAt: "desc" },
    });

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
      select: {
        code: true,
        name: true,
        school: true,
        updatedAt: true,
        rating: true,
        teaching: true,
        difficulty: true,
        workload: true,
      },
    });

    if (!courseInfo) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Fetch 3 comments for each sentiment
    const [positive, neutral, negative] = await Promise.all([
      prisma.comment.findMany({
        where: { courseCode: code, sentiment: "positive" },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.comment.findMany({
        where: { courseCode: code, sentiment: "neutral" },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
      prisma.comment.findMany({
        where: { courseCode: code, sentiment: "negative" },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const course = {
      ...courseInfo,
      lastUpdate: courseInfo.updatedAt,
      rating: courseInfo.rating?.toFixed(1) || "Ei vielä arvosteluja",
      teaching: courseInfo.teaching?.toFixed(1) || "Ei vielä arvosteluja",
      difficulty: courseInfo.difficulty?.toFixed(1) || "Ei vielä arvosteluja",
      workload: courseInfo.workload?.toFixed(1) || "Ei vielä arvosteluja",
      comments: {
        positive,
        neutral,
        negative,
      },
    };

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

const getMoreComments = async (req, res) => {
  const { toSkip, sentiment, courseCode } = req.query;
  console.log("Skip:", toSkip, "for ", sentiment, "course:", courseCode);

  try {
    const comments = await prisma.comment.findMany({
      where: {
        sentiment: sentiment,
        courseCode: courseCode,
      },
      skip: parseInt(toSkip) || 0,
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch more comments" });
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

    const existingCourse = await prisma.course.findFirst({
      where: {
        school,
        OR: [{ name }, { code }],
      },
    });

    if (existingCourse) {
      let errorMessage = "Kurssi näyttäisi jo löytyvän kyseisessä koulussa!";
      if (existingCourse.name === name && existingCourse.code === code) {
        errorMessage = "Kurssin nimi ja koodi löytyvät jo kyseisessä koulussa!";
      } else if (existingCourse.name === name) {
        errorMessage = "Kurssin nimi löytyy jo kyseisessä koulussa!";
      } else if (existingCourse.code === code) {
        errorMessage = "Kurssin koodi löytyy jo kyseisessä koulussa!";
      }

      return res.status(409).json({ message: errorMessage });
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

const addRating = async (req, res) => {
  try {
    const { courseCode, ratings, comment, recaptchaToken } = req.body;

    if (!courseCode || !ratings) {
      return res.status(400).json({ message: "Virhe arvostelun lisäämisessä" });
    }

    if (!recaptchaToken) {
      return res.status(400).json({ message: "reCAPTCHA validation failed" });
    }

    console.log(courseCode, ratings);
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;
    const fetchResponse = await fetch(verifyUrl, { method: "POST" });
    const data = await fetchResponse.json();

    if (!data.success) {
      return res.status(400).json({ message: "Recaptcha validation failed" });
    }

    const course = await prisma.course.findUnique({
      where: { code: courseCode },
      include: { ratings: true },
    });

    if (!course) {
      return res.status(404).json({ message: "Kurssia ei löytynyt" });
    }

    const newRating = await prisma.rating.create({
      data: {
        courseCode,
        rating: ratings.rating,
        teaching: ratings.teaching,
        difficulty: ratings.difficulty,
        workload: ratings.workload,
      },
    });

    const allRatings = [...course.ratings, newRating];
    const totalVotes = allRatings.length;

    const rating =
      allRatings.reduce((acc, r) => acc + r.rating, 0) / totalVotes;
    const teaching =
      allRatings.reduce((acc, r) => acc + r.teaching, 0) / totalVotes;
    const difficulty =
      allRatings.reduce((acc, r) => acc + r.difficulty, 0) / totalVotes;
    const workload =
      allRatings.reduce((acc, r) => acc + r.workload, 0) / totalVotes;

    await prisma.course.update({
      where: { code: courseCode },
      data: {
        totalVotes,
        rating,
        teaching,
        difficulty,
        workload,
      },
    });

    if (comment) {
      //Check for flagging
      const sentiment = await checkSentiment(comment);
      console.log(sentiment);
      await prisma.comment.create({
        data: {
          courseCode,
          content: comment,
          sentiment: sentiment,
        },
      });
    }

    res.status(200).json({ message: "Arvostelu lisätty onnistuneesti!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Virhe arvostelun lisäämisessä :(" });
  }
};

module.exports = {
  getInitialCourses,
  getCourses,
  addCourse,
  getCourse,
  addRating,
  getMoreComments,
};
