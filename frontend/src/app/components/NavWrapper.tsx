"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavWrapper() {
  const hiddenNavRoutes = ["/login", "/register"];
  const pathname = usePathname();

  if (hiddenNavRoutes.includes(pathname)) return null;

  return <Navbar />;
}
