import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AppCTA from "@/components/AppCTA";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white py-20 px-4">
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
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                BibleYes
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
              World English Bible · Public Domain
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Read the Bible with clarity.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              A clean, distraction-free reading experience for the World English Bible.
              Search across all 66 books. Notes, highlights, and AI coming soon.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <Link
                href="/bible/web/john/1"
                className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Read the Bible online
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search the Bible
              </Link>
            </div>

            {/* Verse card */}
            <div className="max-w-lg mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-8 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Verse of the day
              </p>
              <blockquote className="text-gray-800 text-lg font-serif leading-relaxed mb-3">
                "Your word is a lamp to my feet, and a light for my path."
              </blockquote>
              <cite className="text-sm font-medium text-gray-500 not-italic">
                Psalm 119:105 · WEB
              </cite>
              <div className="mt-5 pt-4 border-t border-gray-200 flex gap-4">
                <Link
                  href="/bible/web/psalms/119"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Read Psalm 119 →
                </Link>
                <Link
                  href="/bible/web/john/1"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Start in John →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant badge */}
        <section className="border-t border-gray-100 bg-gray-50 py-5 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                AI Bible Assistant
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Ask questions about any chapter or verse — Bible-based answers, summaries, and commentary.
            </p>
            <Link
              href="/bible/web/john/1"
              className="flex-shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
            >
              Try it now →
            </Link>
          </div>
        </section>

        <AppCTA />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
}
