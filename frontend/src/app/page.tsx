import { prisma } from "../lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full bg-white">
      {users.map((user) => {
        return (
          <Link href={`/users/${user.id}`} className="text-black">
            {user.username}
          </Link>
        );
      })}
    </div>
  );
}
