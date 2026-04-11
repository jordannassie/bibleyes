"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const VERSE_TEXT = "Your word is a lamp to my feet, and a light for my path.";
const VERSE_REF = "Psalm 119:105";
const VERSE_TRANSLATION = "WEB";
const VERSE_HREF = "/bible/web/psalms/119";
const SHARE_TEXT = `"${VERSE_TEXT}" — ${VERSE_REF} · ${VERSE_TRANSLATION}`;

// Words to italicise in the photo overlay
const ITALIC_WORDS = new Set(["LAMP", "LIGHT"]);

function OverlayText({ text }: { text: string }) {
  const words = text.toUpperCase().split(" ");
  return (
    <>
      {words.map((word, i) =>
        ITALIC_WORDS.has(word) ? (
          <em key={i} className="italic font-extrabold not-italic">
            {word}{" "}
          </em>
        ) : (
          <span key={i}>{word} </span>
        )
      )}
    </>
  );
}

export default function VerseOfDayShare() {
  const [shared, setShared] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title: "Verse of the Day — BibleYes", text: SHARE_TEXT }).catch(() => {});
    } else {
      navigator.clipboard.writeText(SHARE_TEXT).catch(() => {});
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    }
  }

  function twitterHref() {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT + " — bibleyes.com")}`;
  }

  function whatsappHref() {
    return `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " — bibleyes.com")}`;
  }

  return (
    <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-gray-100 dark:border-[#2a2a2a] shadow-sm flex flex-col sm:flex-row text-left">

      {/* ── Left: photo with verse overlay ── */}
      <div className="relative sm:w-[42%] h-52 sm:h-auto flex-shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=500&fit=crop&auto=format&q=80"
          alt="Mountain landscape"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 340px"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />

        {/* Verse text */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 py-8">
          <p className="text-white text-sm font-bold uppercase tracking-wider leading-relaxed drop-shadow">
            <OverlayText text={VERSE_TEXT} />
          </p>
          <p className="mt-4 text-white/60 text-[10px] font-bold uppercase tracking-widest drop-shadow">
            · {VERSE_REF.toUpperCase()}
          </p>
        </div>
      </div>

      {/* ── Right: info panel ── */}
      <div className="flex-1 bg-white dark:bg-[#1a1a1a] px-7 py-8 flex flex-col justify-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
          </svg>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666666]">
            Verse of the Day
          </p>
        </div>

        {/* Verse */}
        <p className="text-gray-900 dark:text-white text-base font-medium leading-relaxed mb-1">
          {VERSE_TEXT}
        </p>
        <p className="text-sm text-gray-400 dark:text-[#666666] mb-6">
          {VERSE_REF} ({VERSE_TRANSLATION})
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
          >
            {shared ? (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            )}
            {shared ? "Copied!" : "Share"}
          </button>

          <Link
            href={VERSE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#333333] px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-[#cccccc] hover:bg-gray-50 dark:hover:bg-[#222222] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Read Psalm 119
          </Link>
        </div>

        {/* Social share row */}
        <div className="flex items-center gap-1 mt-5">
          <a
            href={twitterHref()}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
            className="p-2 rounded-full text-gray-300 dark:text-[#555555] hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="p-2 rounded-full text-gray-300 dark:text-[#555555] hover:text-green-600 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
