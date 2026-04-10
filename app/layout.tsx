import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900 pb-16 sm:pb-0">
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
