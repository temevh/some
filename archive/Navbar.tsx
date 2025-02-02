"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [links, setLinks] = useState([
    { title: "Home", src: "/" },
    { title: "Feed", src: "/feed" },
  ]);

  return (
    <div className="w-full h-14 flex flex-row justify-center items-center m-auto gap-8">
      {links.map((link) => {
        return (
          <div
            key={link.title}
            onClick={() => router.push(link.src)}
            className="px-10 hover:cursor-pointer hover:bg-gray-500 rounded-md hover:text-black"
          >
            <p className="text-2xl text-black">{link.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
