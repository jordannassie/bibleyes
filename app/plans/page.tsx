"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FREE_FEATURES = [
  "Read the full Bible",
  "Save verses",
  "Limited daily AI verse journeys",
];

const PLUS_FEATURES = [
  "More daily AI verse journeys",
  "Richer devotional guidance",
  "Full BibleYes experience",
];

export default function PlansPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"Free" | "Plus" | null>(null);

  function handleUpgrade() {
    setSelected("Plus");
    // Placeholder — real billing will connect here later
    setTimeout(() => setSelected(null), 1800);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-200">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-[#2a2a2a] px-4 h-14 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-1.5 -ml-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="flex-1 text-center text-sm font-semibold text-gray-900 dark:text-white">
          Choose Your Plan
        </span>
        {/* spacer to balance back button */}
        <div className="w-8" />
      </div>

      <div className="max-w-md mx-auto px-4 py-8 pb-24 space-y-4">

        <p className="text-center text-sm text-gray-400 dark:text-[#666] mb-6">
          Simple plans for your daily walk in God's Word.
        </p>

        {/* ── Free card ── */}
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#2a2a2a] rounded-2xl shadow-sm px-6 py-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-base font-bold text-gray-900 dark:text-white">Free</p>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#666] bg-gray-100 dark:bg-[#2a2a2a] rounded-full px-2.5 py-1">
              Current plan
            </span>
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">$0</p>
          <ul className="space-y-2.5 mb-6">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-[#888]">
                <svg className="w-4 h-4 text-gray-300 dark:text-[#555] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <div className="w-full text-center text-sm text-gray-300 dark:text-[#555] font-medium py-2">
            Your current plan
          </div>
        </div>

        {/* ── Plus card ── */}
        <div className="bg-gray-900 dark:bg-white rounded-2xl shadow-sm px-6 py-6 relative overflow-hidden">
          {/* subtle texture line */}
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_8px)]" />

          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-base font-bold text-white dark:text-gray-900">BibleYes Plus</p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white bg-white/20 dark:bg-gray-900/10 rounded-full px-2.5 py-1">
                Recommended
              </span>
            </div>
            <p className="text-2xl font-extrabold text-white dark:text-gray-900 mb-0.5">$8<span className="text-sm font-normal">/month</span></p>
            <p className="text-xs text-gray-400 dark:text-[#666] mb-5">Cancel any time.</p>
            <ul className="space-y-2.5 mb-6">
              {PLUS_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300 dark:text-gray-600">
                  <svg className="w-4 h-4 text-blue-400 dark:text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={selected === "Plus"}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full py-3 text-sm font-bold hover:bg-gray-100 dark:hover:bg-[#111] transition-colors disabled:opacity-60"
            >
              {selected === "Plus" ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-gray-900 animate-spin" />
                  Coming soon…
                </>
              ) : (
                "Upgrade to Plus"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-300 dark:text-[#555] pt-2">
          Billing is not active yet. This is a preview.
        </p>

        <div className="text-center pt-2">
          <Link href="/user" className="text-sm text-gray-400 dark:text-[#666] hover:text-gray-600 dark:hover:text-[#aaa] transition-colors">
            Back to My Journey
          </Link>
        </div>

      </div>
    </div>
  );
}
