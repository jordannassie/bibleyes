"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { VerseData } from "@/lib/bible/types";
import type { AIResponse } from "@/lib/ai/types";

type Props = {
  verse: VerseData;
  translationCode: string;
  bookSlug: string;
  chapter: number;
  bookName?: string;
  chapterText?: string;
};

const HIGHLIGHT_COLORS = [
  { id: "yellow", bg: "bg-yellow-300",  ring: "ring-yellow-400",  hex: "#fde047" },
  { id: "green",  bg: "bg-green-400",   ring: "ring-green-500",   hex: "#4ade80" },
  { id: "blue",   bg: "bg-blue-400",    ring: "ring-blue-500",    hex: "#60a5fa" },
  { id: "orange", bg: "bg-orange-400",  ring: "ring-orange-500",  hex: "#fb923c" },
  { id: "pink",   bg: "bg-pink-400",    ring: "ring-pink-500",    hex: "#f472b6" },
];

export default function VerseRow({ verse, translationCode, bookSlug, chapter, bookName, chapterText }: Props) {
  const [selected, setSelected] = useState(false);
  const [highlight, setHighlight] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [commentary, setCommentary] = useState<AIResponse | null>(null);
  const [commentaryLoading, setCommentaryLoading] = useState(false);
  const [commentaryError, setCommentaryError] = useState<string | null>(null);

  const ref = useRef<HTMLSpanElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    if (!selected) return;
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSelected(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [selected]);

  // Reset commentary when popup closes
  useEffect(() => {
    if (!selected) {
      setCommentary(null);
      setCommentaryError(null);
      setCommentaryLoading(false);
    }
  }, [selected]);

  const handleCopy = useCallback(() => {
    const label = bookName
      ? `${bookName} ${chapter}:${verse.number}`
      : `${bookSlug} ${chapter}:${verse.number}`;
    navigator.clipboard.writeText(`"${verse.text}" — ${label} (WEB)`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [verse, chapter, bookSlug, bookName]);

  const handleShare = useCallback(async () => {
    const label = bookName
      ? `${bookName} ${chapter}:${verse.number}`
      : `${bookSlug} ${chapter}:${verse.number}`;
    const text = `"${verse.text}" — ${label} (WEB)`;
    if (navigator.share) {
      await navigator.share({ title: "BibleYes", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }, [verse, chapter, bookSlug, bookName]);

  const handleCommentary = useCallback(async () => {
    if (commentary || commentaryLoading) return;
    setCommentaryLoading(true);
    setCommentaryError(null);
    try {
      const res = await fetch("/api/ai/bible-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: bookSlug,
          bookName: bookName ?? bookSlug,
          chapter,
          translation: translationCode,
          chapterText: chapterText ?? verse.text,
          verseNumber: verse.number,
          verseText: verse.text,
          question: `Provide a concise Bible commentary for ${bookName ?? bookSlug} ${chapter}:${verse.number}. Explain its meaning, theological significance, and any helpful historical or cross-reference context.`,
          mode: "advanced",
        }),
      });
      const data: AIResponse = await res.json();
      setCommentary(data);
    } catch {
      setCommentaryError("Failed to load commentary. Please try again.");
    } finally {
      setCommentaryLoading(false);
    }
  }, [commentary, commentaryLoading, bookSlug, bookName, chapter, translationCode, chapterText, verse]);

  const highlightColor = HIGHLIGHT_COLORS.find((c) => c.id === highlight);

  return (
    <span ref={ref} className="relative inline">
      {/* Verse number */}
      <sup className="text-xs font-semibold text-gray-400 dark:text-[#666666] mr-0.5 select-none leading-none">
        {verse.number}
      </sup>

      {/* Verse text — tappable/clickable */}
      <span
        onClick={() => setSelected((s) => !s)}
        className={[
          "leading-relaxed cursor-pointer rounded-sm transition-colors",
          selected
            ? "bg-gray-100 dark:bg-gray-700"
            : highlightColor
            ? ""
            : "text-gray-800",
        ].join(" ")}
        style={highlight && highlightColor ? { backgroundColor: highlightColor.hex + "55" } : undefined}
      >
        {verse.text}{" "}
      </span>

      {/* Verse action popup */}
      {selected && (
        <span
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 flex flex-col items-stretch bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333333] rounded-2xl shadow-xl overflow-hidden select-none"
          style={{ width: "280px" }}
        >
          {/* Header */}
          <span className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-[#333333]">
            <span className="text-xs font-semibold text-gray-500 dark:text-[#888888] uppercase tracking-wide">
              {bookName ?? bookSlug} {chapter}:{verse.number}
            </span>
            <button
              onClick={() => setSelected(false)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>

          {/* Highlight row */}
          <span className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-[#333333]">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" />
            </svg>
            <span className="flex items-center gap-2">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setHighlight(highlight === c.id ? null : c.id)}
                  className={[
                    "w-6 h-6 rounded-full transition-transform",
                    c.bg,
                    highlight === c.id ? "ring-2 ring-offset-1 scale-110 " + c.ring : "",
                  ].join(" ")}
                  aria-label={`Highlight ${c.id}`}
                />
              ))}
            </span>
          </span>

          {/* AI Commentary button */}
          <button
            onClick={handleCommentary}
            disabled={commentaryLoading}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors border-b border-gray-100 dark:border-[#333333] w-full text-left disabled:opacity-60"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {commentaryLoading ? "Loading commentary…" : commentary ? "Commentary loaded" : "AI Commentary"}
            {commentaryLoading && (
              <svg className="w-3.5 h-3.5 ml-auto animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
            )}
          </button>

          {/* Commentary panel */}
          {commentaryError && (
            <span className="px-4 py-3 text-xs text-red-500 border-b border-gray-100 dark:border-[#333333]">
              {commentaryError}
            </span>
          )}

          {commentary && (
            <span className="flex flex-col border-b border-gray-100 dark:border-[#333333]">
              <span className="px-4 pt-3 pb-2 text-xs text-gray-800 dark:text-gray-200 leading-relaxed max-h-48 overflow-y-auto block font-sans">
                {commentary.answer}
              </span>
              {commentary.relatedReferences.length > 0 && (
                <span className="px-4 pb-3 flex flex-wrap gap-1">
                  {commentary.relatedReferences.map((ref) => (
                    <span
                      key={ref}
                      className="text-[10px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full px-2 py-0.5"
                    >
                      {ref}
                    </span>
                  ))}
                </span>
              )}
            </span>
          )}

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-[#cccccc] hover:bg-gray-50 dark:hover:bg-[#222222] transition-colors border-b border-gray-100 dark:border-[#333333] w-full text-left"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-[#cccccc] hover:bg-gray-50 dark:hover:bg-[#222222] transition-colors w-full text-left"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </span>
      )}
    </span>
  );
}
