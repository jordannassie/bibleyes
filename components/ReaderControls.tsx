"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BOOKS, OLD_TESTAMENT, NEW_TESTAMENT } from "@/data/books";
import type { TranslationMeta } from "@/lib/bible/types";

type Props = {
  translation: string;
  bookSlug: string;
  chapter: number;
  translations: TranslationMeta[];
};

const FONT_SIZES = [
  { label: "S",  size: "0.9rem"   },
  { label: "M",  size: "1.125rem" },
  { label: "L",  size: "1.35rem"  },
  { label: "XL", size: "1.6rem"   },
];
const DEFAULT_IDX = 1;
const STORAGE_KEY = "bibleyes-font-size";
const CSS_VAR     = "--bible-font-size";

export default function ReaderControls({ translation, bookSlug, chapter, translations }: Props) {
  const router = useRouter();
  const [fontIdx, setFontIdx] = useState(DEFAULT_IDX);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const idx = FONT_SIZES.findIndex((s) => s.size === saved);
      if (idx !== -1) {
        setFontIdx(idx);
        document.documentElement.style.setProperty(CSS_VAR, saved);
      }
    } else {
      document.documentElement.style.setProperty(CSS_VAR, FONT_SIZES[DEFAULT_IDX].size);
    }
  }, []);

  function cycleFont() {
    const next = (fontIdx + 1) % FONT_SIZES.length;
    const { size } = FONT_SIZES[next];
    setFontIdx(next);
    document.documentElement.style.setProperty(CSS_VAR, size);
    localStorage.setItem(STORAGE_KEY, size);
  }

  const currentBook  = BOOKS.find((b) => b.slug === bookSlug);
  const chapterCount = currentBook?.chapterCount ?? 1;

  const navigate = (newBook: string, newChapter: number, newTranslation?: string) => {
    router.push(`/bible/${newTranslation ?? translation}/${newBook}/${newChapter}`);
  };

  const selectStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 0.5rem center",
    backgroundSize: "1.2em 1.2em",
  };

  return (
    <div className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#2a2a2a] sticky top-14 z-40 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">

          {/* Book selector */}
          <select
            value={bookSlug}
            onChange={(e) => navigate(e.target.value, 1)}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] px-4 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-[#e5e5e5] outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors"
            style={selectStyle}
          >
            <optgroup label="Old Testament">
              {OLD_TESTAMENT.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </optgroup>
            <optgroup label="New Testament">
              {NEW_TESTAMENT.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </optgroup>
          </select>

          {/* Chapter selector */}
          <select
            value={chapter}
            onChange={(e) => navigate(bookSlug, Number(e.target.value))}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] px-4 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-[#e5e5e5] outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors"
            style={selectStyle}
          >
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          {/* Translation selector */}
          <select
            value={translation}
            onChange={(e) => navigate(bookSlug, chapter, e.target.value)}
            className="flex-shrink-0 appearance-none rounded-full border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] px-4 py-1.5 pr-8 text-sm font-medium text-gray-700 dark:text-[#e5e5e5] outline-none hover:border-gray-300 focus:border-gray-400 cursor-pointer transition-colors"
            style={selectStyle}
          >
            {translations.map((t) => (
              <option key={t.code} value={t.code}>{t.code.toUpperCase()}</option>
            ))}
            {translations.length === 0 && <option value="web">WEB</option>}
          </select>

          <div className="flex-1" />

          {/* Audio */}
          <button
            aria-label="Audio"
            className="flex-shrink-0 p-1.5 rounded-full border border-gray-200 dark:border-[#333333] text-gray-500 dark:text-[#888888] hover:border-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>

          {/* Font size — tap to cycle S → M → L → XL */}
          <button
            aria-label="Font size"
            onClick={cycleFont}
            className="flex-shrink-0 flex items-center gap-0.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#333333] text-gray-500 dark:text-[#888888] hover:border-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors select-none"
          >
            <span className="text-sm font-bold leading-none">A</span>
            <span className="text-[10px] font-bold leading-none">A</span>
            <span className="text-[10px] font-semibold text-gray-400 dark:text-[#666] ml-1 leading-none">
              {FONT_SIZES[fontIdx].label}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}
