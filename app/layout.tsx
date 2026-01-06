import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brain Brawl - Trivia Game",
  description: "Test your knowledge with Brain Brawl, a modern and engaging trivia game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] bg-fixed">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
