import { prisma } from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full bg-white">
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p className="text-black">{user.email}</p>
            <p className="text-black">{user.username}</p>
            <p className="text-black">{user.password}</p>
          </div>
        );
      })}
    </div>
  );
}
