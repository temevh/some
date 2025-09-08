"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "./components/ui/toaster";
import { MobileProvider } from "@/context/mobilecontext";
import i18next from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { Navbar } from "./components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MobileProvider>
        <I18nextProvider i18n={i18next}>
          <body
            className={` pt-4 ${geistSans.variable} ${geistMono.variable} antialiased lg:w-1/3 mx-auto bg-bg`}
          >
            <nav>
              <Navbar />
            </nav>

            <main className="py-6">{children}</main>
            <Toaster />
          </body>
        </I18nextProvider>
      </MobileProvider>
    </html>
  );
}
