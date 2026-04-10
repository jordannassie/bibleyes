"use client";

import { useState, useEffect, useCallback } from "react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "Texas",
    avatar: "SM",
    color: "bg-blue-500",
    quote:
      "BibleYes completely changed how I do my morning devotions. The AI explains passages in a way I've never heard before — like having a Bible scholar right beside me.",
  },
  {
    name: "Marcus T.",
    location: "Georgia",
    avatar: "MT",
    color: "bg-emerald-500",
    quote:
      "I've tried every Bible app out there. BibleYes is the cleanest, most beautiful reading experience I've found. The AI assistant is incredible — it actually quotes Scripture back to you.",
  },
  {
    name: "Priya K.",
    location: "California",
    avatar: "PK",
    color: "bg-purple-500",
    quote:
      "As a new believer, I was intimidated by the Bible. BibleYes AI helped me understand Romans 8 in a way that made me weep. Truly a blessing.",
  },
  {
    name: "David R.",
    location: "Florida",
    avatar: "DR",
    color: "bg-orange-500",
    quote:
      "The cross-reference feature in the AI is next level. I asked about Psalm 23 and it connected it to John 10 in a way that deepened my faith instantly.",
  },
  {
    name: "Amanda L.",
    location: "Ohio",
    avatar: "AL",
    color: "bg-rose-500",
    quote:
      "Clean, fast, no ads. I use BibleYes every single day — on my phone, laptop, everywhere. The dark mode is gorgeous and the AI is spot on.",
  },
  {
    name: "Pastor James W.",
    location: "North Carolina",
    avatar: "JW",
    color: "bg-indigo-500",
    quote:
      "I recommend BibleYes to my congregation. The AI stays true to Scripture and gives well-grounded, Christian answers. This is what technology in the church should look like.",
  },
];

const Stars = () => (
  <div className="flex items-center gap-0.5 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 250);
  }, [animating]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      goTo((active + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active, goTo]);

  const t = TESTIMONIALS[active];

  return (
    <section className="bg-white dark:bg-[#0f0f0f] border-t border-gray-100 dark:border-[#2a2a2a] py-20 px-4 transition-colors duration-200">
      <div className="max-w-3xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-[#666666] mb-3">
          What people are saying
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Loved by Bible readers everywhere.
        </h2>

        {/* Card */}
        <div
          className={`transition-all duration-250 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          <div className="bg-gray-50 dark:bg-[#1c1c1c] rounded-3xl px-8 py-10 shadow-sm border border-gray-100 dark:border-[#333333] max-w-xl mx-auto">
            <Stars />

            <blockquote className="text-gray-800 dark:text-white text-lg font-serif leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-xs font-bold">{t.avatar}</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-400 dark:text-[#666666]">{t.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 h-2.5 bg-gray-900 dark:bg-white"
                  : "w-2.5 h-2.5 bg-gray-300 dark:bg-[#444444] hover:bg-gray-400 dark:hover:bg-[#666666]"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="p-2.5 rounded-full border border-gray-200 dark:border-[#333333] text-gray-500 dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo((active + 1) % TESTIMONIALS.length)}
            className="p-2.5 rounded-full border border-gray-200 dark:border-[#333333] text-gray-500 dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
