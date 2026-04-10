"use client";

import { useState } from "react";
import type { VerseData } from "@/lib/bible/types";
import BookmarkButton from "./BookmarkButton";
import HighlightButton from "./HighlightButton";
import NoteButton from "./NoteButton";

type Props = {
  verse: VerseData;
  translationCode: string;
  bookSlug: string;
  chapter: number;
};

export default function VerseRow({ verse, translationCode, bookSlug, chapter }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Verse number */}
      <sup className="text-xs font-semibold text-gray-400 mr-1 select-none leading-none">
        {verse.number}
      </sup>

      {/* Verse text */}
      <span className="text-gray-800 leading-relaxed">{verse.text} </span>

      {/* Hover action strip */}
      {hovered && (
        <span className="inline-flex items-center gap-0.5 ml-1 align-middle">
          <BookmarkButton
            translationCode={translationCode}
            bookSlug={bookSlug}
            chapter={chapter}
            verse={verse.number}
          />
          <HighlightButton
            translationCode={translationCode}
            bookSlug={bookSlug}
            chapter={chapter}
            verse={verse.number}
          />
          <NoteButton
            translationCode={translationCode}
            bookSlug={bookSlug}
            chapter={chapter}
            verse={verse.number}
          />
        </span>
      )}
    </span>
  );
}
