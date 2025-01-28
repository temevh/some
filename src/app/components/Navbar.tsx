"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  let user = "John";
  const router = useRouter();

  const [links, setLinks] = useState([
    { title: "Home", src: "/" },
    { title: "Feed", src: "/feed" },
  ]);

  useEffect(() => {
    if (user !== undefined) {
      setLinks((prevLinks) => [
        ...prevLinks,
        { title: "Profile", src: "/profile" },
      ]);
    }
  }, [user]);

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
      {user && (
        <div className="absolute right-10 bg-blue-300 p-1 rounded-md">
          <p className="text-2xl text-black">Hello {user}!</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
