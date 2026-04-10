import Link from "next/link";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { searchVerses } from "@/lib/bible/queries";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-100 text-gray-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const results = query ? await searchVerses(query) : [];
  const hasResults = results.length > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar defaultValue={query} />
        </div>

        {/* Header / count */}
        {query && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {hasResults
                ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
                : `No results for "${query}"`}
            </h1>
            {hasResults && (
              <p className="text-sm text-gray-500 mt-1">
                Searching the World English Bible (WEB)
              </p>
            )}
          </div>
        )}

        {/* No query */}
        {!query && (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-10 h-10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">Type a word or phrase to search the Bible.</p>
          </div>
        )}

        {/* No results */}
        {query && !hasResults && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4 text-sm">
              No verses found. Try a different word or phrase.
            </p>
            <Link
              href="/bible/web/john/1"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Browse from the beginning →
            </Link>
          </div>
        )}

        {/* Results list */}
        {hasResults && (
          <ul className="divide-y divide-gray-100">
            {results.map((result, i) => (
              <li key={i}>
                <Link
                  href={`/bible/${result.translationCode}/${result.bookSlug}/${result.chapter}`}
                  className="flex flex-col gap-1.5 py-4 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors"
                >
                  <span className="text-xs font-semibold text-blue-600 tracking-wide">
                    {result.reference}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-serif">
                    {highlight(result.text, query)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {results.length === 30 && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Showing first 30 results. Refine your search for more specific results.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
