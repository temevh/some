import { prisma } from "@/lib/db";

export default async function UserPage() {
  const users = await prisma.user.findMany();

  return <div className="w-full bg-white"></div>;
}
