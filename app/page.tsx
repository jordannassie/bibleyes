import Link from "next/link";
import Header from "@/components/Header";
import AppCTA from "@/components/AppCTA";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Read the Bible with clarity.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Read the WEB Bible online for free. Clean reading, notes, bookmarks, and
              BibleYes AI coming soon.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Get the app
              </a>
              <Link
                href="/bible/web/john/1"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Read the Bible online
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Verse highlight card */}
            <div className="max-w-lg mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-8 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Verse of the day
              </p>
              <blockquote className="text-gray-800 text-lg font-serif leading-relaxed mb-3">
                "For God so loved the world that he gave his one and only Son, that
                whoever believes in him shall not perish but have eternal life."
              </blockquote>
              <cite className="text-sm font-medium text-gray-500 not-italic">
                John 3:16 · WEB
              </cite>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/bible/web/john/1"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Start reading John →
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
