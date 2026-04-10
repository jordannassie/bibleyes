"use client";

import { useState } from "react";

type Props = {
  translationCode: string;
  bookSlug: string;
  chapter: number;
  verse: number;
};

const COLORS = ["yellow", "green", "blue", "pink"];

export default function HighlightButton({ translationCode, bookSlug, chapter, verse }: Props) {
  const [color, setColor] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function apply(c: string) {
    // Stub: wire to server action once auth is set up
    setColor(color === c ? null : c);
    setOpen(false);
  }

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        title="Highlight this verse"
        className={`p-1 rounded transition-colors ${
          color ? "text-yellow-500" : "text-gray-400 hover:text-gray-700"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill={color ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      {open && (
        <span className="absolute bottom-full left-0 mb-1 flex gap-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-md z-10">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => apply(c)}
              title={c}
              className={`w-4 h-4 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? "border-gray-700" : "border-transparent"
              }`}
              style={{ backgroundColor: c === "yellow" ? "#fde68a" : c === "green" ? "#bbf7d0" : c === "blue" ? "#bfdbfe" : "#fbcfe8" }}
            />
          ))}
        </span>
      )}
    </span>
  );
}
