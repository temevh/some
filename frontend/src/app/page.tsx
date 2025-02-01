import { prisma } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return (
    <div className="w-full bg-white">
      {users.map((user) => {
        return (
          <li>
            <Link
              href={`/users/${user.username}`}
              className="text-black"
              key={user.username}
            >
              {user.username}
            </Link>
          </li>
        );
      })}
    </div>
  );
}
