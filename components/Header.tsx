"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-xl font-bold text-gray-900 tracking-tight"
          >
            BibleYes
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {["Bible", "Plans", "Topics"].map((label) => (
              <Link
                key={label}
                href={label === "Bible" ? "/bible/web/john/1" : "#"}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto hidden sm:block">
            <SearchBar />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <Link
              href="#"
              className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Get the app
            </Link>

            {/* Language */}
            <button
              aria-label="Language"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </button>

            {/* Menu */}
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Profile */}
            <button
              aria-label="Profile"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
