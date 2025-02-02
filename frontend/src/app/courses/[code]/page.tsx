import { prisma } from "../../../../lib/db";

interface Params {
  code: string;
}

export default async function CoursePage({ params }: { params: Params }) {
  const course = await prisma.course.findUnique({
    where: {
      code: params.code,
    },
  });

  return (
    <div className="w-full bg-white">
      <p className="text-black">{course?.id}</p>
      <p className="text-black">{course?.name}</p>
    </div>
  );
}
