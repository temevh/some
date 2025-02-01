import { prisma } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full bg-white">
      {users.map((user) => {
        return (
          <Link
            href={`/users/${user.username}`}
            className="text-black"
            key={user.id}
          >
            {user.username}
          </Link>
        );
      })}
    </div>
  );
}
