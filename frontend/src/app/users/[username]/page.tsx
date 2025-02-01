import { prisma } from "../../../../lib/db";

interface Params {
  username: string;
}

export default async function UserPage({ params }: { params: Params }) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
  });

  return (
    <div className="w-full bg-white">
      <p className="text-black">{user?.username}</p>
      <p className="text-black">{user?.email}</p>
    </div>
  );
}
