"use client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const links = [
    { title: "Main", src: "/" },
    { title: "Profile", src: "/profile" },
  ];

  return (
    <div className="w-full h-30 bg-red-500 flex flex-row justify-center">
      <p>Navbar and shieeett</p>
      {links.map((link) => {
        return (
          <p key={link.title} onClick={() => router.push(link.src)}>
            {link.title}
          </p>
        );
      })}
    </div>
  );
};

export default Navbar;
