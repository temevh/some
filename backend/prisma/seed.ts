const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(process.env.DATABASE_URL);
  const course = await prisma.course.upsert({
    where: { code: "COMP.CS.100" },
    update: {},
    create: {
      code: "COMP.CS.100",
      name: "Ohjelmointi 1: Johdatus ohjelmointiin",
      school: "TUNI",
      comments: {
        create: [
          {
            content: "Great introduction to programming!",
            sentiment: "positive",
          },
          {
            content: "A bit too much workload for beginners.",
            sentiment: "negative",
          },
          {
            content: "Overall okay, but could be better structured.",
            sentiment: "neutral",
          },
        ],
      },
      ratings: {
        create: [
          { rating: 4.5, teaching: 5, difficulty: 3, workload: 4 },
          { rating: 3.2, teaching: 3, difficulty: 4, workload: 3 },
        ],
      },
    },
  });

  console.log("Seeded course:", course);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
