import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AppCTA from "@/components/AppCTA";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import VerseOfDayShare from "@/components/VerseOfDayShare";
import Testimonials from "@/components/Testimonials";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex flex-col transition-colors duration-200">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white dark:bg-[#0f0f0f] py-20 px-4 transition-colors duration-200">
          <div className="max-w-3xl mx-auto text-center">
            {/* Brand icon */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Image
                src={LOGO_URL}
                alt="BibleYes"
                width={56}
                height={56}
                className="rounded-2xl shadow-md"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                BibleYes
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
              World English Bible · Public Domain
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Read the Bible with AI.
            </h1>
            <p className="text-lg text-gray-500 dark:text-[#888888] mb-10 max-w-xl mx-auto leading-relaxed">
              A clean, distraction-free reading experience for the World English Bible.
              Ask questions about any verse — Bible-based answers powered by AI.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <Link
                href="/bible/web/john/1"
                className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                Read the Bible online
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-[#333333] px-6 py-3 text-sm font-medium text-gray-700 dark:text-[#cccccc] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search the Bible
              </Link>
            </div>

            {/* Verse of the Day card */}
            <VerseOfDayShare />
          </div>
        </section>

        <Testimonials />
        <AppCTA />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
}
