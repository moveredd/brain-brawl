import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brain Brawl - Trivia Game",
  description:
    "Test your knowledge with Brain Brawl, a modern and engaging trivia game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="overscroll-none bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] bg-fixed"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white min-h-screen`}
      >
        {/* Global app shell */}
        <div className="relative min-h-screen flex flex-col">
          {/* Subtle radial glow background */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.25),_transparent_60%)]"
          />

          {/* Fine grain / noise overlay for depth */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18] mix-blend-soft-light bg-[url('data:image/svg+xml,%3Csvg_width%3D%27160%27_height%3D%27160%27_viewBox%3D%270_0_160_160%27_fill%3D%27none%27_xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id%3D%27n%27_x%3D%27-20%25%27_y%3D%27-20%25%27_width%3D%27140%25%27_height%3D%27140%25%27_color-interpolation-filters%3D%27sRGB%27%3E%3CfeTurbulence_type%3D%27fractalNoise%27_baseFrequency%3D%270.65%27_numOctaves%3D%272%27_stitchTiles%3D%27noStitch%27/%3E%3C/filter%3E%3Crect_width%3D%27160%27_height%3D%27160%27_filter%3D%27url(%23n)%27/%3E%3C/svg%3E')]"
          />

          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
