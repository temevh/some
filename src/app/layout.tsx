"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavWrapper } from "./components/";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-1/3 mx-auto bg-background`}
      >
        <NavWrapper />
        {children}
      </body>
    </html>
  );
}
