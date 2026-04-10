"use client";

import { useGuide } from "@/components/GuideContext";
import { GUIDES, guideAvatarUrl, type Guide } from "@/lib/ai/guides";

const ACCENT_RING: Record<string, string> = {
  emerald: "ring-emerald-400",
  blue: "ring-blue-400",
  violet: "ring-violet-400",
  amber: "ring-amber-400",
};

const ACCENT_BADGE: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/40",
  blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/40",
  violet: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700/40",
  amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/40",
};

const ACCENT_BTN: Record<string, string> = {
  emerald: "bg-emerald-600 hover:bg-emerald-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  violet: "bg-violet-600 hover:bg-violet-700",
  amber: "bg-amber-600 hover:bg-amber-700",
};

function GuideCard({ guide, isSelected, onSelect }: { guide: Guide; isSelected: boolean; onSelect: () => void }) {
  const ring = ACCENT_RING[guide.accentColor] ?? "ring-gray-400";
  const badge = ACCENT_BADGE[guide.accentColor] ?? "";
  const btn = ACCENT_BTN[guide.accentColor] ?? "bg-gray-800 hover:bg-gray-700";

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden
        bg-white dark:bg-[#141414]
        ${isSelected
          ? `border-transparent ring-2 ${ring} shadow-lg`
          : "border-gray-200 dark:border-[#2a2a2a] hover:border-gray-300 dark:hover:border-[#3a3a3a] hover:shadow-md"
        }`}
    >
      {/* Selected badge */}
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: guide.accentHex }}
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ${isSelected ? ring : "ring-gray-100 dark:ring-[#2a2a2a]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={guideAvatarUrl(guide.avatarSeed)}
              alt={`${guide.name} AI guide avatar`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{guide.name}</p>
            <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">{guide.title}</p>
            <span className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge}`}>
              AI Guide
            </span>
          </div>
        </div>

        {/* Specialty */}
        <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: guide.accentHex }}>
          {guide.specialty}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-[#aaa] leading-relaxed flex-1 mb-5">
          {guide.description}
        </p>

        {/* CTA */}
        <button
          onClick={onSelect}
          className={`w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-colors ${
            isSelected
              ? "opacity-60 cursor-default"
              : btn
          }`}
          disabled={isSelected}
          aria-pressed={isSelected}
        >
          {isSelected ? "Current guide" : `Chat with ${guide.name}`}
        </button>
      </div>
    </div>
  );
}

export default function GuideSelector() {
  const { selectedGuide, setGuideById } = useGuide();

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#1c1c1c]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666] mb-3">
            Personalized Bible Study
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Choose your Bible guide
          </h2>
          <p className="text-base text-gray-500 dark:text-[#888] max-w-2xl mx-auto leading-relaxed">
            Learn Scripture through Bible-based AI guides built for commentary, word studies, theology, and daily application.
            Each guide uses the same trusted BibleYes AI system with a unique tone and focus.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GUIDES.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              isSelected={selectedGuide.id === guide.id}
              onSelect={() => setGuideById(guide.id)}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-gray-400 dark:text-[#555] mt-8 leading-relaxed">
          These are AI-generated guides — not real people. All guides are Bible-based and Christianity-only.
          Your selected guide is saved automatically.
        </p>
      </div>
    </section>
  );
}
