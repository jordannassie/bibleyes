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
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Get the app
              </a>
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

        <AppCTA />
        <FeatureCards />
      </main>

      <Footer />
    </div>
  );
}
