import Image from "next/image";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

const ONE_BILLION_BLACK =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/1b%20Black.png";
const ONE_BILLION_WHITE =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/1b%20white.png";

export default function Footer() {
  const links = [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="border-t border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#141414] transition-colors duration-200">

      {/* Ministry banner */}
      <div className="border-b border-gray-100 dark:border-[#2a2a2a] py-5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <span className="text-base font-bold text-gray-500 dark:text-gray-400">
              A Digital Ministry of
            </span>
          <a
            href="https://1billion.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src={ONE_BILLION_BLACK}
              alt="1Billion.org"
              width={80}
              height={22}
              className="object-contain dark:hidden"
            />
            <Image
              src={ONE_BILLION_WHITE}
              alt="1Billion.org"
              width={80}
              height={22}
              className="object-contain hidden dark:block"
            />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* BibleYes brand */}
        <div className="flex items-center gap-2">
          <Image
            src={LOGO_URL}
            alt="BibleYes logo"
            width={48}
            height={48}
            className="rounded-md"
          />
          <p className="text-base font-semibold text-gray-900 dark:text-white">BibleYes</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-[#e5e5e5] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} BibleYes</p>
      </div>
    </footer>
  );
}
