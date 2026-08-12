import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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

// Runs before first paint to apply the saved/system theme, avoiding a
// flash of the wrong theme while React hydrates (see ThemeToggle).
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
