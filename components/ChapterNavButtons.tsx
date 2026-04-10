"use client";

import Link from "next/link";

type Props = {
  translation: string;
  book: string;
  prevChapter: number | null;
  nextChapter: number | null;
};

export default function ChapterNavButtons({
  translation,
  book,
  prevChapter,
  nextChapter,
}: Props) {
  return (
    <>
      {/* Previous */}
      {prevChapter !== null ? (
        <Link
          href={`/bible/${translation}/${book}/${prevChapter}`}
          aria-label="Previous chapter"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}

      {/* Next */}
      {nextChapter !== null ? (
        <Link
          href={`/bible/${translation}/${book}/${nextChapter}`}
          aria-label="Next chapter"
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  );
}
