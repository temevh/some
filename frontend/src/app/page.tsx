import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full bg-white">
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p className="text-black">{user.email}</p>
            <Link className="text-black" href={`/${user.id}`}>
              {user.username}
            </Link>
            <p className="text-black">{user.password}</p>
          </div>
        );
      })}
    </div>
  );
}
