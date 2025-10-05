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
            className={`pt-6 ${geistSans.variable} ${geistMono.variable} antialiased mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 bg-bg text-text`}
            style={{
              backgroundImage: 'url("/tausta.png")',
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              backgroundPosition: "top left",
            }}
          >
            <div className="w-full flex justify-center">
              <div className="mx-auto max-w-6xl w-full bg-bw shadow-soft rounded-base px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-3rem)] border border-border/10">
                <nav>
                  <Navbar />
                </nav>

                <main className="py-6">{children}</main>
                <Toaster />
              </div>
            </div>
          </body>
        </I18nextProvider>
      </MobileProvider>
    </html>
  );
}
