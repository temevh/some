"use client";

import { Button } from "./ui";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2 select-none">
            <span className="text-xl font-extrabold tracking-tight text-black">
              Course Grader
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="border-2 border-black shadow-[3px_3px_0_0_#000] rounded-none"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>

          <Button
            variant="default"
            size="sm"
            className="border-2 border-black shadow-[3px_3px_0_0_#000] rounded-none"
          >
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>

          {/* English Flag */}
          <Button
            variant="default"
            size="sm"
            className="border-2 border-black shadow-[3px_3px_0_0_#000] rounded-none p-1"
            onClick={() => changeLanguage("en")}
          >
            <Image
              src="/flags/gb_flag.svg"
              alt="English"
              width={24}
              height={24}
            />
          </Button>

          {/* Finnish Flag */}
          <Button
            variant="default"
            size="sm"
            className="border-2 border-black shadow-[3px_3px_0_0_#000] rounded-none p-1"
            onClick={() => changeLanguage("fi")}
          >
            <Image
              src="/flags/fi_flag.svg"
              alt="Suomi"
              width={24}
              height={24}
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
