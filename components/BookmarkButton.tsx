"use client";

import { useState } from "react";

type Props = {
  translationCode: string;
  bookSlug: string;
  chapter: number;
  verse: number;
};

export default function BookmarkButton({ translationCode, bookSlug, chapter, verse }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      // Stub: wire to server action once auth is set up
      // const result = await toggleBookmark({ translationCode, bookSlug, chapter, verse });
      setSaved(!saved);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={saved ? "Remove bookmark" : "Bookmark this verse"}
      className={`p-1 rounded transition-colors ${
        saved ? "text-blue-600" : "text-gray-400 hover:text-gray-700"
      }`}
    >
      <svg className="w-3.5 h-3.5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}
