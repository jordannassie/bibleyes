import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Click any verse",
    copy: "Tap or click any verse while reading to open the verse actions menu.",
    visual: <VerseSelectVisual />,
  },
  {
    number: "02",
    title: "Select AI Commentary",
    copy: "Choose AI Commentary from the menu to open BibleYes AI Assistant for that verse.",
    visual: <PopupVisual />,
  },
  {
    number: "03",
    title: "Get commentary & ask questions",
    copy: "Read Bible-based commentary, understand the verse, and ask follow-up questions anytime.",
    visual: <DrawerVisual />,
  },
];

// ── Step 1 visual: Bible reader with a highlighted verse ──
function VerseSelectVisual() {
  return (
    <div className="w-full bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-[#2a2a2a] shadow-sm overflow-hidden">
      {/* Reader chrome */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-[#2a2a2a]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-[#555]">John 1</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-[#333]" />
          <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-[#333]" />
        </div>
      </div>
      {/* Verse lines */}
      <div className="px-4 py-3 font-serif text-[11px] leading-[1.9] text-gray-500 dark:text-[#888] space-y-0.5">
        <p>
          <sup className="text-[8px] font-semibold text-gray-300 dark:text-[#555] mr-0.5">1</sup>
          In the beginning was the Word, and the Word was with God…
        </p>
        <p>
          <sup className="text-[8px] font-semibold text-gray-300 dark:text-[#555] mr-0.5">2</sup>
          The same was in the beginning with God.
        </p>
        {/* Selected verse */}
        <p className="relative">
          <sup className="text-[8px] font-semibold text-blue-400 mr-0.5">3</sup>
          <span className="bg-blue-50 dark:bg-blue-950/40 text-gray-700 dark:text-[#ccc] rounded px-0.5 cursor-pointer ring-1 ring-blue-200 dark:ring-blue-800">
            All things were made through him; and without him was not anything made that was made.
          </span>
        </p>
        <p>
          <sup className="text-[8px] font-semibold text-gray-300 dark:text-[#555] mr-0.5">4</sup>
          In him was life, and the life was the light of men.
        </p>
      </div>
      <div className="px-4 pb-2">
        <span className="inline-flex items-center gap-1 text-[9px] text-blue-500 dark:text-blue-400 font-medium">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
          Tap a verse to select
        </span>
      </div>
    </div>
  );
}

// ── Step 2 visual: Verse action popup ──
function PopupVisual() {
  return (
    <div className="w-full flex items-start justify-center pt-2">
      <div className="w-[200px] bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-2xl shadow-xl overflow-hidden text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-[#2a2a2a]">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400 dark:text-[#666]">John 1:3</span>
          <span className="w-3 h-3 rounded-full bg-gray-100 dark:bg-[#333]" />
        </div>
        {/* Highlight dots */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 dark:border-[#2a2a2a]">
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" />
          </svg>
          <span className="w-4 h-4 rounded-full bg-yellow-300" />
          <span className="w-4 h-4 rounded-full bg-green-400" />
          <span className="w-4 h-4 rounded-full bg-blue-400" />
          <span className="w-4 h-4 rounded-full bg-orange-400" />
          <span className="w-4 h-4 rounded-full bg-pink-400" />
        </div>
        {/* AI Commentary — highlighted */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/40">
          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">AI Commentary</span>
          <svg className="w-2.5 h-2.5 text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        {/* Copy */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 dark:border-[#2a2a2a]">
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px] text-gray-400 dark:text-[#666]">Copy</span>
        </div>
        {/* Share */}
        <div className="flex items-center gap-2 px-3 py-2">
          <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-[11px] text-gray-400 dark:text-[#666]">Share</span>
        </div>
      </div>
    </div>
  );
}

// ── Step 3 visual: AI Drawer with response ──
function DrawerVisual() {
  return (
    <div className="w-full bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-[#2a2a2a] shadow-sm overflow-hidden">
      {/* Drawer header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#1c1c1c]">
        <div className="w-6 h-6 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-gray-900 dark:text-white leading-none">BibleYes AI Assistant</p>
          <p className="text-[8px] text-gray-400 dark:text-[#666] mt-0.5">John 1</p>
        </div>
      </div>
      {/* Chat area */}
      <div className="px-3 py-3 space-y-2 bg-gray-50 dark:bg-[#0f0f0f]">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl rounded-tr-sm px-3 py-2 text-[10px] leading-relaxed">
            Commentary for John 1:3
          </div>
        </div>
        {/* AI response bubble */}
        <div className="flex justify-start">
          <div className="max-w-[90%] bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#333] rounded-xl rounded-tl-sm px-3 py-2.5 shadow-sm">
            <p className="text-[10px] text-gray-700 dark:text-[#ccc] leading-relaxed">
              John 1:3 establishes Christ as the agent of all creation — echoing Genesis 1:1 and affirming his divine pre-existence before the incarnation.
            </p>
            <div className="flex gap-1 mt-2">
              <span className="text-[8px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full px-2 py-0.5 border border-blue-100 dark:border-blue-900">Genesis 1:1</span>
              <span className="text-[8px] font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full px-2 py-0.5 border border-blue-100 dark:border-blue-900">Col 1:16</span>
            </div>
          </div>
        </div>
      </div>
      {/* Input chrome */}
      <div className="px-3 py-2 border-t border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#1c1c1c]">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#333] px-2.5 py-1.5">
          <span className="text-[9px] text-gray-300 dark:text-[#555] flex-1">Ask a follow-up question…</span>
          <div className="w-5 h-5 rounded-md bg-gray-900 dark:bg-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#2a2a2a] py-20 px-4 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666666] mb-3">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Study any verse in seconds
          </h2>
          <p className="text-base text-gray-500 dark:text-[#888888] max-w-md mx-auto leading-relaxed">
            Click a verse, open AI Assistant, get Bible-based commentary, and ask any question from a Christian perspective.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#2a2a2a] rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Visual mockup */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] px-5 pt-5 pb-3 border-b border-gray-100 dark:border-[#2a2a2a]">
                {step.visual}
              </div>

              {/* Text content */}
              <div className="px-5 py-5 flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-300 dark:text-[#444] tracking-widest">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-[#888888] leading-relaxed">
                  {step.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/bible/web/john/1"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full px-7 py-3 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            Try AI Assistant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-xs text-gray-400 dark:text-[#555]">
            Bible-based answers — commentary, clarity, and follow-up questions right where you read.
          </p>
        </div>

      </div>
    </section>
  );
}
