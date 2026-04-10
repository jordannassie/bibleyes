"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage, AIResponse } from "@/lib/ai/types";
import { QUICK_ACTIONS } from "@/lib/ai/types";

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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Listen for header AI button toggle
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("bibleyes:toggle-ai", handler);
    return () => window.removeEventListener("bibleyes:toggle-ai", handler);
  }, []);

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

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full z-50 flex flex-col bg-gray-950 transition-all duration-300 ease-in-out
          w-full sm:w-[480px]
          ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Bot icon */}
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">BibleYes AI</p>
              <p className="text-[11px] text-white/40 leading-none mt-0.5">
                {bookName} {chapter} · {translation.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center text-center pt-6 pb-4 px-2">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Ask about {bookName} {chapter}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
                Get Bible-based answers, summaries, cross references, and practical application — from a Christian perspective.
              </p>

              {/* Quick actions */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10"
                  >
                    <span>{action.icon}</span>
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
                  <div className="max-w-[85%] bg-white text-gray-900 rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed font-medium">
                    {msg.content}
                  </div>
                </div>
              );
            }

            if (msg.role === "error") {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] bg-red-900/40 border border-red-500/30 text-red-300 rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Assistant message
            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[95%] space-y-3">
                  <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <p className="text-sm text-white/90 leading-[1.75] whitespace-pre-wrap">
                      {msg.answer}
                    </p>
                  </div>

                  {/* Source chips */}
                  {(msg.keyVerses?.length > 0 || msg.relatedReferences?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {msg.keyVerses?.map((ref, j) => (
                        <span key={`kv-${j}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-semibold border border-blue-400/20">
                          📖 {ref}
                        </span>
                      ))}
                      {msg.relatedReferences?.map((ref, j) => (
                        <span key={`rr-${j}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-white/50 text-[11px] font-medium border border-white/10">
                          {ref}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.disclaimer && (
                    <p className="text-[11px] text-white/30 italic px-1">{msg.disclaimer}</p>
                  )}

                  {/* Follow-up quick actions */}
                  {i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {QUICK_ACTIONS.slice(0, 3).map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                          className="px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white text-[11px] font-medium border border-white/10 transition-colors"
                          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                        >
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
              <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="flex-shrink-0 border-t border-white/10 px-4 py-4 bg-gray-950">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${bookName} ${chapter}...`}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 focus:bg-white/10 transition-colors max-h-32 leading-relaxed"
              style={{ minHeight: "44px", backgroundColor: "rgba(255,255,255,0.06)" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-white text-gray-900 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-white/25 text-center mt-2.5">
            Bible-based answers only · Not a substitute for pastoral guidance
          </p>
        </div>
      </div>
    </>
  );
}
