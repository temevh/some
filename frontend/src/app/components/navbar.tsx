"use client";

import { Button } from "./ui";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("fi");

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const flagStyle = (lang: string) =>
    selectedLanguage === lang
      ? "filter-none rounded-md border-solid border-2 border-white"
      : "filter grayscale rounded-md border-solid border-2 border-gray-600";

  return (
    <header className="w-full">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2 select-none">
            <span className="text-xl font-extrabold tracking-tight text-black">
              Kurssari
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <div className="flex gap-2 p-2">
            {/* Finnish Flag */}
            <Image
              onClick={() => changeLanguage("fi")}
              src="/flags/fi_flag.svg"
              alt="Suomi"
              width={42}
              height={42}
              className={flagStyle("fi")}
            />
            {/* English Flag */}
            <Image
              src="/flags/gb_flag.svg"
              alt="English"
              width={42}
              height={42}
              className={flagStyle("en")}
              onClick={() => changeLanguage("en")}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
