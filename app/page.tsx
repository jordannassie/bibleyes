import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import AppCTA from "@/components/AppCTA";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import VerseOfDayShare from "@/components/VerseOfDayShare";

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
              Read the Bible with AI.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              A clean, distraction-free reading experience for the World English Bible.
              Ask questions about any verse — Bible-based answers powered by AI.
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

            {/* Verse of the Day card */}
            <VerseOfDayShare />
          </div>
        </section>

        {/* AI Bible Assistant — full section */}
        <section className="border-t border-gray-100 bg-gray-950 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Bot icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              AI Bible Assistant
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Ask anything about Scripture.
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
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
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {q}
                </Link>
              ))}
            </div>

            <Link
              href="/bible/web/john/1"
              className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-8 py-3.5 text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Open AI Assistant
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
