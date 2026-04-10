import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AppCTA from "@/components/AppCTA";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import VerseOfDayShare from "@/components/VerseOfDayShare";
import Testimonials from "@/components/Testimonials";
import GuideSelector from "@/components/GuideSelector";

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

        {/* AI Bible Assistant — blue section */}
        <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #0f2a5e 0%, #1a3a7c 40%, #0d1f4a 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">

            {/* Chat icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">
              AI Bible Assistant
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Ask anything about Scripture.
            </h2>
            <p className="text-lg text-blue-200/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Get Bible-based answers, chapter summaries, cross-references, and commentary — all from a Christian perspective. Powered by AI, grounded in the Word.
            </p>

            {/* Sample prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10 text-left">
              {[
                "What does John 3:16 mean?",
                "Summarize the book of Romans",
                "What are cross-references for Psalm 23?",
                "How can I apply this verse today?",
              ].map((q) => (
                <Link
                  key={q}
                  href="/bible/web/john/1"
                  className="flex items-center gap-3 bg-white/8 hover:bg-white/15 border border-white/15 rounded-xl px-4 py-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {q}
                </Link>
              ))}
            </div>

            <Link
              href="/bible/web/john/1"
              className="inline-flex items-center gap-2 bg-white text-blue-900 rounded-full px-8 py-3.5 text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Open AI Assistant
            </Link>
          </div>
        </section>

        <GuideSelector />
        <Testimonials />
        <AppCTA />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
}
