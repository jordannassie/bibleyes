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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Reset messages when chapter changes
  useEffect(() => {
    setMessages([]);
  }, [bookSlug, chapter]);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;
    setInput("");

    const userMsg: ChatMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
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

  const panelClasses = isOpen
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0 pointer-events-none";

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle tab — right edge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1 bg-gray-900 text-white text-[10px] font-bold tracking-wider rounded-l-xl px-2 py-4 shadow-lg hover:bg-gray-700 transition-all ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <svg className="w-4 h-4 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          AI
        </span>
      </button>

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 flex flex-col bg-white border-l border-gray-200 shadow-2xl transition-all duration-300 ease-in-out
          w-full sm:w-[420px]
          ${panelClasses}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">BibleYes AI</p>
              <p className="text-[10px] text-gray-400 leading-none">
                {bookName} {chapter} · {translation.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Empty state */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center text-center py-8 px-2">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Ask about {bookName} {chapter}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-xs">
                Get Bible-based answers, summaries, cross references, and practical application — all from a Christian perspective.
              </p>

              {/* Quick action pills */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg, i) => {
            if (msg.role === "user") {
              return (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] bg-gray-900 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              );
            }

            if (msg.role === "error") {
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[85%] bg-red-50 border border-red-100 text-red-700 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // Assistant message
            return (
              <div key={i} className="flex justify-start">
                <div className="max-w-[95%] space-y-3">
                  {/* Answer */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {msg.answer}
                    </p>
                  </div>

                  {/* Source chips */}
                  {(msg.keyVerses?.length > 0 || msg.relatedReferences?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {msg.keyVerses?.map((ref, j) => (
                        <span
                          key={`kv-${j}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100"
                        >
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                          {ref}
                        </span>
                      ))}
                      {msg.relatedReferences?.map((ref, j) => (
                        <span
                          key={`rr-${j}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Disclaimer */}
                  {msg.disclaimer && (
                    <p className="text-[10px] text-gray-400 italic px-1">
                      {msg.disclaimer}
                    </p>
                  )}

                  {/* Follow-up quick actions */}
                  {i === messages.length - 1 && (
                    <div className="flex flex-wrap gap-1.5 px-1">
                      {QUICK_ACTIONS.slice(0, 3).map((action) => (
                        <button
                          key={action.label}
                          onClick={() => sendMessage(action.buildQuestion(bookName, chapter))}
                          className="px-2.5 py-1 rounded-full border border-gray-200 text-[10px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
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

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 border-t border-gray-100 px-4 py-3 bg-white">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${bookName} ${chapter}...`}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors max-h-32 leading-relaxed"
              style={{ minHeight: "40px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Bible-based answers only · Not a substitute for pastoral guidance
          </p>
        </div>
      </div>
    </>
  );
}
