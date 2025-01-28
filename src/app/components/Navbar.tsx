"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  let user = "John";
  const router = useRouter();

  const links = [
    { title: "Main", src: "/" },
    { title: "Settings", src: "/settings" },
    { title: "Feed", src: "/feed" },
  ];

  useEffect(() => {
    user !== undefined ? links.push({ title: user, src: "/profile" }) : null;
  }, []);

  return (
    <div className="w-full h-14 bg-red-400 flex flex-row justify-center items-center m-auto gap-8">
      {links.map((link) => {
        return (
          <div
            key={link.title}
            onClick={() => router.push(link.src)}
            className="px-10 hover:cursor-pointer hover:bg-gray-500 rounded-md hover:text-black"
          >
            <p className="text-2xl">{link.title}</p>
          </div>
        );
      })}
      <div className="absolute right-10 bg-blue-300 p-1 rounded-md">
        <p className="text-2xl text-black">Hello {user}!</p>
      </div>
    </div>
  );
};

export default Navbar;
