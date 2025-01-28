"use client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const links = [
    { title: "Main", src: "/" },
    { title: "Profile", src: "/profile" },
  ];

  return (
    <div className="w-full h-10 bg-red-400 flex flex-row justify-center mx-auto gap-8">
      {links.map((link) => {
        return (
          <div
            key={link.title}
            onClick={() => router.push(link.src)}
            className="px-10 hover:cursor-pointer hover:bg-gray-500 my-auto rounded-md hover:text-black"
          >
            <p className="text-xl">{link.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
