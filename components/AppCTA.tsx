import Image from "next/image";
import Link from "next/link";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://bibleyes.com&bgcolor=ffffff&color=000000&margin=2&qzone=1";

export default function AppCTA() {
  return (
    <section className="bg-white py-20 px-4 border-t border-gray-100">
      <div className="max-w-2xl mx-auto text-center">

        {/* Logo + QR side by side */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="BibleYes icon"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
            <span className="text-xs font-semibold text-gray-500 tracking-wide">BibleYes</span>
          </div>

          <div className="h-24 w-px bg-gray-200" />

          <div className="flex flex-col items-center gap-2">
            <div className="rounded-2xl border border-gray-200 p-2 bg-white shadow-sm">
              <Image
                src={QR_URL}
                alt="Scan to open BibleYes.com"
                width={96}
                height={96}
                className="rounded-lg"
                unoptimized
              />
            </div>
            <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
              Scan to open
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Read the Bible free on any device.
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Open BibleYes in your browser — no download needed. Free, clean, and ad-free.
        </p>

        <Link
          href="/bible/web/john/1"
          className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-7 py-3 text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Read the Bible Online
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
