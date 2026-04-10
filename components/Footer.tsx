import Image from "next/image";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

export default function Footer() {
  const links = [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={LOGO_URL}
            alt="BibleYes logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <p className="text-sm font-semibold text-gray-900">BibleYes</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
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
