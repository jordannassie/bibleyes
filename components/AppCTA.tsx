import Link from "next/link";

export default function AppCTA() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* QR placeholder */}
        <div className="mx-auto mb-8 w-36 h-36 rounded-2xl bg-gray-900 flex flex-col items-center justify-center gap-1 shadow-lg">
          <div className="grid grid-cols-3 gap-1 p-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${
                  [0, 2, 6, 8, 4].includes(i) ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
          <p className="text-white text-[9px] font-medium tracking-wider mt-1">
            SCAN TO INSTALL
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get a free Bible for your phone and tablet.
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Online or offline — BibleYes is available any time. No ads. No purchases.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {/* Google Play */}
          <a
            href="#"
            className="flex items-center gap-2 bg-gray-900 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.87c.28.16.6.2.9.12l11.04-11.04L12 9.83 3.18 23.87zM21.54 10.1l-2.96-1.7-3.41 3.41 3.41 3.41 2.97-1.71c.85-.49.85-1.93-.01-2.41zM2.01 1.05C1.85 1.3 1.75 1.6 1.75 1.94v20.12c0 .34.1.64.26.89L12 12 2.01 1.05zM15.12 2.23L4.08.53c-.3-.08-.62-.04-.9.12L12 9.53l3.12-7.3z" />
            </svg>
            Get it on Google Play
          </a>

          {/* App Store */}
          <a
            href="#"
            className="flex items-center gap-2 bg-gray-900 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on the App Store
          </a>
        </div>

        <Link
          href="/bible/web/john/1"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Or Read the Bible Online
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
