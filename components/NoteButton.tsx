"use client";

import { useState } from "react";

type Props = {
  translationCode: string;
  bookSlug: string;
  chapter: number;
  verse: number;
};

export default function NoteButton({ translationCode, bookSlug, chapter, verse }: Props) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    if (!note.trim()) return;
    // Stub: wire to server action once auth is set up
    setSaved(true);
    setTimeout(() => setOpen(false), 800);
  }

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        title="Add a note"
        className={`p-1 rounded transition-colors ${
          saved ? "text-purple-500" : "text-gray-400 hover:text-gray-700"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {open && (
        <span className="absolute bottom-full right-0 mb-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-10 block">
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Add note</p>
          <textarea
            autoFocus
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Your note..."
            className="w-full text-sm border border-gray-200 rounded-lg p-2 resize-none outline-none focus:border-gray-400"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </span>
      )}
    </span>
  );
}
