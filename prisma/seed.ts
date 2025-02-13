const prisma = require("../backend/prismaClient");

async function main() {
  const course = await prisma.course.upsert({
    where: { code: "COMP.CS.100" },
    update: {},
    create: {
      code: "COMP.CS.100",
      name: "Ohjelmointi 1: Johdatus ohjelmointiin",
      school: "Tuni",
      comments: { create: [] },
      ratings: { create: [] },
    },
  });
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
