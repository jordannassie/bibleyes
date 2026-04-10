"use client";

import { useRouter } from "next/navigation";
import { BOOKS } from "@/data/bible/web";

type Props = {
  translation: string;
  book: string;
  chapter: number;
};

export default function ReaderControls({ translation, book, chapter }: Props) {
  const router = useRouter();

  const currentBook = BOOKS.find((b) => b.id === book);
  const chapterCount = currentBook?.chapters ?? 1;

  const navigate = (newBook: string, newChapter: number) => {
    router.push(`/bible/${translation}/${newBook}/${newChapter}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
          {/* Book selector */}
          <select
            value={book}
            onChange={(e) => navigate(e.target.value, 1)}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors pr-8"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.2em 1.2em" }}
          >
            {BOOKS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.display}
              </option>
            ))}
          </select>

          {/* Chapter selector */}
          <select
            value={chapter}
            onChange={(e) => navigate(book, Number(e.target.value))}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors pr-8"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.2em 1.2em" }}
          >
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          {/* Translation */}
          <select
            value={translation}
            onChange={(e) => router.push(`/bible/${e.target.value}/${book}/${chapter}`)}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors pr-8"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.2em 1.2em" }}
          >
            <option value="web">WEB</option>
            <option value="kjv" disabled>KJV (coming soon)</option>
            <option value="esv" disabled>ESV (coming soon)</option>
          </select>

          <div className="flex-1" />

          {/* Parallel */}
          <button className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Parallel
          </button>

          {/* Audio */}
          <button
            aria-label="Audio"
            className="flex-shrink-0 p-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25S19.5 7.5 19.5 12s-3.75 6.75-3.75 6.75M12 8.25v7.5M8.25 9.75a3.75 3.75 0 000 4.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v5.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 14.625v-5.25z" />
            </svg>
          </button>

          {/* Font size */}
          <button
            aria-label="Font size"
            className="flex-shrink-0 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            AA
          </button>
        </div>
      </div>
    </div>
  );
}
