const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    eyebrow: "Read anywhere",
    description:
      "Open BibleYes in any browser — phone, tablet, or desktop. No download, no account required.",
    cta: "Start reading",
    href: "/bible/web/john/1",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    eyebrow: "Make it your Bible",
    description:
      "Highlight verses, bookmark passages, and write personal notes. Build your own annotated scripture experience.",
    cta: "Create your free account",
    href: "#",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    eyebrow: "AI Bible Assistant",
    description:
      "Ask questions about any chapter or verse. Get Bible-based answers, summaries, and commentary — all from a Christian perspective.",
    cta: "Try AI Assistant",
    href: "/bible/web/john/1",
  },
];

export default function FeatureCards() {
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center text-center px-8 py-10 gap-4"
            >
              <span className="text-gray-400">{f.icon}</span>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500">
                {f.eyebrow}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                {f.description}
              </p>
              <a
                href={f.href}
                className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                {f.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
