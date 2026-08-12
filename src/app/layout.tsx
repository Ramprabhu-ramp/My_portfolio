import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Pulled from the database so the browser tab title always matches
// whatever name/tagline is set in /admin — no manual editing needed here.
export async function generateMetadata(): Promise<Metadata> {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } });
    if (!profile) throw new Error("No profile");
    return {
      title: `${profile.name} — Portfolio`,
      description: profile.tagline,
    };
  } catch {
    return {
      title: "Portfolio",
      description: "Frontend & full-stack developer portfolio.",
    };
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
