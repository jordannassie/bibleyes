"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { AIMode, ChatMessage, AIResponse } from "@/lib/ai/types";
import type { DevotionalStep } from "@/lib/mock/devotional-content";
import { saveJourneyEntry } from "@/lib/journey-store";

// ── Devotional step config ────────────────────────────────────────────────────
type StepDef = {
  key: DevotionalStep;
  label: string;
  journeyLabel: "Understand" | "Live It" | "Pray";
  active: string;
  icon: React.ReactNode;
};

const STEPS: StepDef[] = [
  {
    key: "understand",
    label: "Understand",
    journeyLabel: "Understand",
    active: "bg-blue-50 text-blue-600 border-blue-200",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    key: "liveIt",
    label: "Live It",
    journeyLabel: "Live It",
    active: "bg-green-50 text-green-600 border-green-200",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: "pray",
    label: "Pray",
    journeyLabel: "Pray",
    active: "bg-purple-50 text-purple-600 border-purple-200",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

// AI prompts per step — verse level
const VERSE_STEP_QUESTIONS: Record<DevotionalStep, (ref: string, text: string) => string> = {
  understand: (ref, text) =>
    `Explain ${ref} — "${text}" — in simple, clear language from a Christian perspective. What does this verse mean and teach us?`,
  liveIt: (ref, text) =>
    `Based on ${ref} — "${text}" — give me one short, practical action I can take today to live out this truth.`,
  pray: (ref, text) =>
    `Write a short, heartfelt personal prayer (3–5 sentences) based on ${ref} — "${text}". Keep it simple and sincere.`,
};

// AI prompts per step — chapter level
const CHAPTER_STEP_QUESTIONS: Record<DevotionalStep, (b: string, c: number) => string> = {
  understand: (b, c) => `What does ${b} chapter ${c} mean? Explain it simply from a Christian perspective.`,
  liveIt:     (b, c) => `What is one practical way I can live out the truth of ${b} chapter ${c} today?`,
  pray:       (b, c) => `Write a short prayer based on the themes and truth of ${b} chapter ${c}.`,
};

// ── Types ─────────────────────────────────────────────────────────────────────
type SelectedVerse = {
  reference: string;
  verseText: string;
  verseNumber: number;
  bookName: string;
  chapter: number;
};

type Props = {
  bookSlug: string;
  bookName: string;
  chapter: number;
  translation: string;
  chapterText: string;
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AIAssistantDrawer({
  bookSlug,
  bookName,
  chapter,
  translation,
  chapterText,
}: Props) {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  const [isOpen, setIsOpen]               = useState(false);
  const [messages, setMessages]           = useState<ChatMessage[]>([]);
  const [input, setInput]                 = useState("");
  const [loading, setLoading]             = useState(false);
  const [aiMode, setAiMode]               = useState<AIMode>("simple");

  // Verse Journey state
  const [selectedVerse, setSelectedVerse]   = useState<SelectedVerse | null>(null);
  const [activeStep, setActiveStep]         = useState<DevotionalStep>("understand");
  const [stepContent, setStepContent]       = useState<Partial<Record<DevotionalStep, string>>>({});
  const [stepLoading, setStepLoading]       = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);

  // ── Auto-open via URL param ──────────────────────────────────────────────
  useEffect(() => {
    if (searchParams.get("ai") === "open") {
      setIsOpen(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("ai");
      router.replace(params.size > 0 ? `${pathname}?${params}` : pathname, { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Header AI button toggle ──────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("bibleyes:toggle-ai", handler);
    return () => window.removeEventListener("bibleyes:toggle-ai", handler);
  }, []);

  // ── Verse Journey trigger from VerseRow ──────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        verseNumber: number;
        verseText: string;
        bookName: string;
        chapter: number;
      };
      const ref = `${detail.bookName} ${detail.chapter}:${detail.verseNumber}`;
      const verse: SelectedVerse = {
        reference:   ref,
        verseText:   detail.verseText,
        verseNumber: detail.verseNumber,
        bookName:    detail.bookName,
        chapter:     detail.chapter,
      };
      setSelectedVerse(verse);
      setActiveStep("understand");
      setStepContent({});
      setMessages([]);
      setIsOpen(true);
      saveJourneyEntry({ reference: ref, step: "Understand" });
      // Auto-fetch Understand
      setTimeout(() => fetchStepContent("understand", verse), 80);
    };
    window.addEventListener("bibleyes:verse-commentary", handler);
    return () => window.removeEventListener("bibleyes:verse-commentary", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([]);
    setSelectedVerse(null);
    setStepContent({});
  }, [bookSlug, chapter]);

  // ── Fetch AI content for a devotional step ───────────────────────────────
  async function fetchStepContent(step: DevotionalStep, verse: SelectedVerse) {
    // Return cached content without re-fetching
    setStepContent((prev) => {
      if (prev[step] !== undefined) return prev;
      return prev; // optimistic — actual fetch below
    });

    setStepLoading(true);
    try {
      const question = VERSE_STEP_QUESTIONS[step](verse.reference, verse.verseText);
      const res = await fetch("/api/ai/bible-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: bookSlug,
          bookName: verse.bookName,
          chapter: verse.chapter,
          translation,
          chapterText,
          verseNumber: verse.verseNumber,
          verseText: verse.verseText,
          question,
          mode: "simple",
        }),
      });
      const data: AIResponse = await res.json();
      setStepContent((prev) => ({ ...prev, [step]: data.answer }));
    } catch {
      setStepContent((prev) => ({
        ...prev,
        [step]: "Something went wrong. Please try again.",
      }));
    } finally {
      setStepLoading(false);
    }
  }

  // ── AI send (chapter-level follow-up questions) ──────────────────────────
  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/bible-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: bookSlug,
          bookName,
          chapter,
          translation,
          chapterText,
          question,
          mode: aiMode,
        }),
      });
      const data: AIResponse = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", ...data }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleStepSelect(step: StepDef) {
    setActiveStep(step.key);
    if (selectedVerse) {
      saveJourneyEntry({ reference: selectedVerse.reference, step: step.journeyLabel });
      // Fetch AI content if not already cached for this step
      if (stepContent[step.key] === undefined && !stepLoading) {
        fetchStepContent(step.key, selectedVerse);
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const activeStepDef  = STEPS.find((s) => s.key === activeStep)!;
  const currentContent = stepContent[activeStep];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full z-50 flex flex-col bg-white dark:bg-[#141414] border-l border-gray-200 dark:border-[#2a2a2a] shadow-2xl transition-all duration-300 ease-in-out
          w-full sm:w-[480px]
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 dark:border-[#2a2a2a] flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {selectedVerse ? "Verse Journey" : "BibleYes AI"}
              </p>
              <p className="text-[11px] text-gray-400 dark:text-[#666] leading-none mt-0.5 truncate">
                {selectedVerse ? selectedVerse.reference : `${bookName} ${chapter}`}
              </p>
            </div>
          </div>

          {/* Simple / Advanced toggle — chapter mode only */}
          {!selectedVerse && (
            <div className="flex items-center bg-gray-100 dark:bg-[#2a2a2a] rounded-full p-0.5 flex-shrink-0 ml-2">
              {(["simple", "advanced"] as AIMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setAiMode(m)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                    aiMode === m
                      ? "bg-white dark:bg-[#444] text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-[#aaa]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] transition-colors ml-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f]">

          {/* ════════ VERSE JOURNEY MODE ════════ */}
          {selectedVerse ? (
            <div className="px-4 py-5 space-y-4">

              {/* Back to chapter */}
              <button
                onClick={() => setSelectedVerse(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-[#666] hover:text-gray-700 dark:hover:text-[#aaa] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to {bookName} {chapter}
              </button>

              {/* Verse card */}
              <div className="bg-white dark:bg-[#1c1c1c] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl px-4 py-4 shadow-sm">
                <p className="text-[11px] font-bold text-blue-500 dark:text-blue-400 mb-2 uppercase tracking-wide">
                  {selectedVerse.reference}
                </p>
                <p className="text-sm text-gray-800 dark:text-[#ddd] leading-relaxed">
                  &ldquo;{selectedVerse.verseText}&rdquo;
                </p>
              </div>

              {/* 3 devotional step buttons */}
              <div className="grid grid-cols-3 gap-2">
                {STEPS.map((step) => {
                  const isActive = activeStep === step.key;
                  return (
                    <button
                      key={step.key}
                      onClick={() => handleStepSelect(step)}
                      className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-semibold transition-all ${
                        isActive
                          ? step.active + " shadow-sm"
                          : "bg-white dark:bg-[#1c1c1c] border-gray-200 dark:border-[#333] text-gray-500 dark:text-[#888] hover:bg-gray-50 dark:hover:bg-[#222]"
                      }`}
                    >
                      <span className={isActive ? "" : "opacity-50"}>{step.icon}</span>
                      {step.label}
                    </button>
                  );
                })}
              </div>

              {/* Content card */}
              <div className={`rounded-2xl border px-4 py-4 shadow-sm min-h-[80px] ${activeStepDef.active}`}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-70">
                  {activeStepDef.label}
                </p>
                {stepLoading && currentContent === undefined ? (
                  <div className="flex items-center gap-1.5 py-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">
                    {currentContent ?? ""}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-1">
                <span className="flex-1 h-px bg-gray-200 dark:bg-[#2a2a2a]" />
                <span className="text-[10px] text-gray-300 dark:text-[#555] font-medium uppercase tracking-wide">
                  Ask a follow-up
                </span>
                <span className="flex-1 h-px bg-gray-200 dark:bg-[#2a2a2a]" />
              </div>

              {/* Follow-up quick pill chips */}
              {selectedVerse && (
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Commentary",    q: `Give me a short theological commentary on ${selectedVerse.reference}.` },
                    { label: "Explain",       q: `Explain ${selectedVerse.reference} in simple everyday language.` },
                    { label: "Cross refs",    q: `What are the key cross-references for ${selectedVerse.reference}?` },
                    { label: "Context",       q: `What is the historical and cultural context of ${selectedVerse.reference}?` },
                    { label: "Apply today",   q: `How can I apply ${selectedVerse.reference} to my life today?` },
                  ].map(({ label, q }) => (
                    <button
                      key={label}
                      onClick={() => sendMessage(q)}
                      disabled={loading}
                      className="px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] text-xs font-medium text-gray-600 dark:text-[#aaa] hover:bg-gray-50 dark:hover:bg-[#222] hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm disabled:opacity-40"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages from follow-up questions */}
              {messages.map((msg, i) => {
                if (msg.role === "user") return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed font-medium">
                      {msg.content}
                    </div>
                  </div>
                );
                if (msg.role === "error") return (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[85%] bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm">
                      {msg.content}
                    </div>
                  </div>
                );
                return (
                  <div key={i} className="flex justify-start">
                    <div className="bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm max-w-[95%]">
                      <p className="text-sm text-gray-800 dark:text-[#ddd] leading-[1.75] whitespace-pre-wrap">{msg.answer}</p>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

          ) : (
            /* ════════ CHAPTER MODE ════════ */
            <div className="px-4 py-5 space-y-5">

              {/* Empty state */}
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center text-center pt-4 pb-2 px-2">
                  <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center mb-4 shadow-md">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-[#555] mb-1">
                    Verse Journey
                  </p>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    Tap a verse to begin
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-[#888] leading-relaxed mb-6 max-w-xs">
                    Select any verse in {bookName} {chapter} to Understand it, Live It, and Pray through it.
                  </p>

                  {/* Chapter-level devotional quick actions */}
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    {STEPS.map((step) => (
                      <button
                        key={step.key}
                        onClick={() => sendMessage(CHAPTER_STEP_QUESTIONS[step.key](bookName, chapter))}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-[#1c1c1c] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-700 dark:text-[#ccc] text-sm font-medium transition-colors border border-gray-200 dark:border-[#333] shadow-sm"
                      >
                        <span className="text-gray-400">{step.icon}</span>
                        {step.label} this chapter
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message history */}
              {messages.map((msg, i) => {
                if (msg.role === "user") return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed font-medium">
                      {msg.content}
                    </div>
                  </div>
                );
                if (msg.role === "error") return (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[85%] bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                      {msg.content}
                    </div>
                  </div>
                );
                return (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[95%] space-y-3">
                      <div className="bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm">
                        <p className="text-sm text-gray-800 dark:text-[#ddd] leading-[1.75] whitespace-pre-wrap">{msg.answer}</p>
                      </div>
                      {(msg.keyVerses?.length > 0 || msg.relatedReferences?.length > 0) && (
                        <div className="flex flex-wrap gap-1.5 px-1">
                          {msg.keyVerses?.map((ref, j) => (
                            <span key={`kv-${j}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-[11px] font-semibold border border-blue-200 dark:border-blue-900/40">
                              {ref}
                            </span>
                          ))}
                          {msg.relatedReferences?.map((ref, j) => (
                            <span key={`rr-${j}`} className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 dark:text-[#888] text-[11px] font-medium border border-gray-200 dark:border-[#333]">
                              {ref}
                            </span>
                          ))}
                        </div>
                      )}
                      {msg.disclaimer && (
                        <p className="text-[11px] text-gray-400 italic px-1">{msg.disclaimer}</p>
                      )}
                      {/* Follow-up step chips */}
                      {i === messages.length - 1 && (
                        <div className="flex flex-wrap gap-1.5 px-1">
                          {STEPS.map((step) => (
                            <button
                              key={step.key}
                              onClick={() => sendMessage(CHAPTER_STEP_QUESTIONS[step.key](bookName, chapter))}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1c1c1c] hover:bg-gray-50 dark:hover:bg-[#222] text-gray-500 dark:text-[#888] hover:text-gray-800 dark:hover:text-white text-[11px] font-medium border border-gray-200 dark:border-[#333] transition-colors shadow-sm"
                            >
                              <span className="opacity-60">{step.icon}</span>
                              {step.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input ── */}
        <div className="flex-shrink-0 border-t border-gray-100 dark:border-[#2a2a2a] px-4 py-4 bg-white dark:bg-[#141414]">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedVerse
                  ? `Ask about ${selectedVerse.reference}…`
                  : `Ask about ${bookName} ${chapter}…`
              }
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1c1c1c] px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#555] outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors max-h-32 leading-relaxed"
              style={{ minHeight: "44px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center hover:bg-gray-700 dark:hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-[#555] text-center mt-2.5">
            Bible-based answers · Not a substitute for pastoral guidance
          </p>
        </div>
      </div>
    </>
  );
}
