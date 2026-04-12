"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import {
  CONTINUE_READING,
  SAVED_VERSES,
  SAVED_PRAYERS,
  type JourneyStep,
} from "@/lib/mock/journey-data";
import { getJourneyEntries, formatRelativeDate, type JourneyEntry } from "@/lib/journey-store";

const STEP_COLORS: Record<JourneyStep, string> = {
  "Understand": "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
  "Live It":    "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/40",
  "Pray":       "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#555] mb-3">
      {children}
    </p>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function UserPage() {
  const { user, logout } = useAuth();
  const { toggle: toggleTheme, theme } = useTheme();
  const router = useRouter();
  const [liveJourneys, setLiveJourneys] = useState<JourneyEntry[]>([]);

  useEffect(() => {
    setLiveJourneys(getJourneyEntries());
  }, []);

  useEffect(() => {
    if (user === null) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("bibleyes-user")) router.replace("/login");
      }, 80);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
      </div>
    );
  }

  const initials  = user.name.split(" ").map((n) => n[0]).join("").toUpperCase();
  const isFree    = user.plan === "Free";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-200">

      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-[#2a2a2a] px-4 h-14 flex items-center transition-colors">
        <Link href="/" className="p-1.5 -ml-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <span className="flex-1 text-center text-sm font-semibold text-gray-900 dark:text-white">
          My Journey
        </span>
        {user.isDemo && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 rounded-full px-2 py-0.5">
            Demo
          </span>
        )}
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-24 space-y-6">

        {/* ── 1. Profile card ── */}
        <Card className="px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-white dark:text-gray-900">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                {/* Plan badge */}
                <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${
                  isFree
                    ? "text-gray-500 dark:text-[#888] bg-gray-100 dark:bg-[#2a2a2a]"
                    : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40"
                }`}>
                  {user.plan}
                </span>
                {isFree && (
                  <Link href="/plans" className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 transition-colors">
                    Upgrade
                  </Link>
                )}
              </div>
              <p className="text-xs text-gray-400 dark:text-[#666] mt-0.5 truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm">🔥</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-[#ccc]">{user.streak} day streak</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-[#555] mt-4 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] text-center">
            Your daily walk in God's Word
          </p>
        </Card>

        {/* ── 2. BibleYes Plus upgrade card (Free plan only) ── */}
        {isFree && (
          <div className="rounded-2xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#141414] shadow-sm px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#555] mb-1">
                  BibleYes Plus
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Deepen your daily devotional
                </p>
                <p className="text-xs text-gray-500 dark:text-[#888] leading-relaxed mb-4">
                  Unlock more daily AI verse journeys and richer Bible guidance.
                </p>
                <ul className="space-y-1 mb-5">
                  {[
                    "More daily AI verse journeys",
                    "Richer devotional experience",
                    "Full BibleYes access",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#888]">
                      <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/plans"
                  className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                >
                  Upgrade to Plus
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <p className="text-[11px] text-gray-300 dark:text-[#555] mt-2.5">Starting at $8/month</p>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. Continue Reading ── */}
        <div>
          <SectionLabel>Continue Reading</SectionLabel>
          <Card className="px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {CONTINUE_READING.book} {CONTINUE_READING.chapter}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-[#666] mt-0.5">
                    Last verse: {CONTINUE_READING.lastVerse} · {CONTINUE_READING.lastStep}
                  </p>
                </div>
              </div>
              <Link
                href={CONTINUE_READING.href}
                className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-4 py-2 text-xs font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
              >
                Continue
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Card>
        </div>

        {/* ── 4. Saved Verses ── */}
        <div>
          <SectionLabel>Saved Verses</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {SAVED_VERSES.map((v) => (
              <div
                key={v.reference}
                className="inline-flex items-center gap-1.5 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#2a2a2a] rounded-xl px-3.5 py-2 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700 dark:text-[#ccc]">{v.reference}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. Recent Verse Journeys ── */}
        <div>
          <SectionLabel>Recent Verse Journeys</SectionLabel>
          {liveJourneys.length > 0 ? (
            <Card>
              {liveJourneys.map((j, i) => (
                <div
                  key={`${j.reference}-${j.step}`}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    i < liveJourneys.length - 1 ? "border-b border-gray-100 dark:border-[#2a2a2a]" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{j.reference}</p>
                    <p className="text-xs text-gray-400 dark:text-[#555] mt-0.5">{formatRelativeDate(j.timestamp)}</p>
                  </div>
                  <span className={`text-[11px] font-semibold border rounded-full px-2.5 py-1 ${STEP_COLORS[j.step as JourneyStep]}`}>
                    {j.step}
                  </span>
                </div>
              ))}
            </Card>
          ) : (
            <Card className="px-5 py-6 text-center">
              <p className="text-sm text-gray-400 dark:text-[#666]">No journeys yet.</p>
              <p className="text-xs text-gray-300 dark:text-[#555] mt-1">Tap a verse while reading to begin.</p>
              <Link
                href="/bible/web/john/1"
                className="inline-flex items-center gap-1.5 mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-4 py-2 text-xs font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
              >
                Start reading
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          )}
        </div>

        {/* ── 6. Saved Prayers ── */}
        <div>
          <SectionLabel>Saved Prayers</SectionLabel>
          <div className="space-y-3">
            {SAVED_PRAYERS.map((p) => (
              <Card key={p.reference} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-purple-500 dark:text-purple-400 mb-1">{p.reference}</p>
                    <p className="text-sm text-gray-700 dark:text-[#ccc] leading-relaxed">&ldquo;{p.text}&rdquo;</p>
                    <p className="text-[11px] text-gray-300 dark:text-[#555] mt-2">{p.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── 7. Settings ── */}
        <div>
          <SectionLabel>Settings</SectionLabel>
          <Card>
            {/* Notifications */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-[#ccc]">Notifications</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 dark:text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-[#ccc]">Dark Mode</span>
              </div>
              <span className="text-xs font-semibold text-gray-400 dark:text-[#666]">
                {theme === "dark" ? "On" : "Off"}
              </span>
            </button>

            {/* Plan & Billing */}
            <Link
              href="/plans"
              className="w-full flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-[#ccc]">Plan & Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 dark:text-[#666]">{user.plan}</span>
                <svg className="w-4 h-4 text-gray-300 dark:text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Log Out */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-semibold">Log Out</span>
            </button>
          </Card>
        </div>

      </div>
    </div>
  );
}
