import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BibleYes — Read the Bible with clarity",
  description:
    "A clean, modern Bible reading experience. Read, search, highlight, and reflect on scripture.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "BibleYes — Read the Bible with clarity",
    description:
      "A clean, distraction-free Bible reading experience with AI-powered study tools.",
    url: "https://bibleyes.com",
    siteName: "BibleYes",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "BibleYes — Holy Bible",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BibleYes — Read the Bible with clarity",
    description:
      "A clean, distraction-free Bible reading experience with AI-powered study tools.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white pb-16 sm:pb-0 transition-colors duration-200">
        <ThemeProvider>
          {children}
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
