"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { AIMode, ChatMessage, AIResponse } from "@/lib/ai/types";
import { QUICK_ACTION_DEFS } from "@/lib/ai/types";

// SVG icons for each quick action (no emojis)
const ACTION_ICONS: Record<string, React.ReactNode> = {
  "Explain": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "Summarize": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h10M4 18h7" />
    </svg>
  ),
  "Cross references": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  "Apply today": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "Commentary": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  ),
};

type Props = {
  bookSlug: string;
  bookName: string;
  chapter: number;
  translation: string;
  chapterText: string;
};

export default function AIAssistantDrawer({
  bookSlug,
  bookName,
  chapter,
  translation,
  chapterText,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AIMode>("simple");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-open when navigated here with ?ai=open
  useEffect(() => {
    if (searchParams.get("ai") === "open") {
      setIsOpen(true);
      // Remove the param from the URL without a page reload
      const params = new URLSearchParams(searchParams.toString());
      params.delete("ai");
      const newUrl = params.size > 0 ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for header AI button toggle
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("bibleyes:toggle-ai", handler);
    return () => window.removeEventListener("bibleyes:toggle-ai", handler);
  }, []);

  // Listen for verse commentary requests from VerseRow
  useEffect(() => {
    const handler = (e: Event) => {
      const { verseNumber, verseText, bookName: vBookName, chapter: vChapter } =
        (e as CustomEvent).detail as {
          verseNumber: number;
          verseText: string;
          bookName: string;
          chapter: number;
        };
      setIsOpen(true);
      const question = `Provide a Bible commentary for ${vBookName} ${vChapter}:${verseNumber} — "${verseText}". Explain its meaning, theological significance, and any relevant historical or cross-reference context.`;
      // Slight delay so the drawer opens before the message fires
      setTimeout(() => sendMessage(question), 100);
    };
    window.addEventListener("bibleyes:verse-commentary", handler);
    return () => window.removeEventListener("bibleyes:verse-commentary", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([]);
  }, [bookSlug, chapter]);

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
          mode,
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer — light theme */}
      <div
        className={`fixed right-0 top-0 h-full z-50 flex flex-col bg-white border-l border-gray-200 shadow-2xl transition-all duration-300 ease-in-out
          w-full sm:w-[480px]
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">BibleYes AI Assistant</p>
              <p className="text-[11px] text-gray-400 leading-none mt-0.5 truncate">
                {bookName} {chapter}
              </p>
            </div>
          </div>

          {/* Simple / Advanced toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5 flex-shrink-0 ml-2">
            <button
              onClick={() => setMode("simple")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                mode === "simple"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                mode === "advanced"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Advanced
            </button>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors ml-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 bg-gray-50">

          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center text-center pt-6 pb-4 px-2">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                AI Assistant
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Ask about this chapter
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
                Bible-based answers from a Christian perspective. Ask me anything about {bookName}{" "}
                {chapter}.
              </p>

              {/* Quick actions */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {QUICK_ACTION_DEFS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors border border-gray-200 shadow-sm"
                  >
                    <span className="text-gray-400">{ACTION_ICONS[action.label]}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => {
            if (msg.role === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] bg-gray-900 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed font-medium">
                    {msg.content}
                  </div>
                </div>
              );
            }

            if (msg.role === "error") {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Assistant message
            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[95%] space-y-3">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm">
                    <p className="text-sm text-gray-800 leading-[1.75] whitespace-pre-wrap">
                      {msg.answer}
                    </p>
                  </div>

                  {/* Source chips */}
                  {(msg.keyVerses?.length > 0 || msg.relatedReferences?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {msg.keyVerses?.map((ref, j) => (
                        <span key={`kv-${j}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {ref}
                        </span>
                      ))}
                      {msg.relatedReferences?.map((ref, j) => (
                        <span key={`rr-${j}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-medium border border-gray-200">
                          {ref}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.disclaimer && (
                    <p className="text-[11px] text-gray-400 italic px-1">{msg.disclaimer}</p>
                  )}

                  {/* Follow-up quick actions */}
                  {i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {QUICK_ACTION_DEFS.slice(0, 3).map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 text-[11px] font-medium border border-gray-200 transition-colors shadow-sm"
                        >
                          <span className="opacity-60">{ACTION_ICONS[action.label]}</span>
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading dots */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
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

        {/* ── Input ── */}
        <div className="flex-shrink-0 border-t border-gray-100 px-4 py-4 bg-white">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${bookName} ${chapter}...`}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors max-h-32 leading-relaxed"
              style={{ minHeight: "44px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
            {/* Send button — always black */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2.5">
            Bible-based answers only · Not a substitute for pastoral guidance
          </p>
        </div>
      </div>
    </>
  );
}
