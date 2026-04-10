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
        <p className="text-sm font-semibold text-gray-900">BibleYes</p>
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
