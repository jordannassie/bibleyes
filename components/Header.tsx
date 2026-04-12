"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/context/AuthProvider";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function handleAIClick() {
    if (pathname.startsWith("/bible")) {
      window.dispatchEvent(new CustomEvent("bibleyes:toggle-ai"));
    } else {
      router.push("/bible/web/john/1?ai=open");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#2a2a2a] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="BibleYes logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              BibleYes
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            <Link
              href="/bible/web/john/1"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-[#888888] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222222] rounded-md transition-colors"
            >
              Bible
            </Link>
            <a
              href="https://1billion.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-[#888888] hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222222] rounded-md transition-colors"
            >
              Evangelism
            </a>
          </nav>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-auto hidden sm:block">
            <SearchBar />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto flex-shrink-0">
            {/* AI toggle */}
            <button
              onClick={handleAIClick}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
              aria-label="Open AI Assistant"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Dark / Light toggle */}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full text-gray-500 dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            >
              {theme === "dark" ? (
                /* Sun icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z" />
                </svg>
              ) : (
                /* Moon icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-gray-500 dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link
              href={user ? "/user" : "/login"}
              aria-label={user ? "My Journey" : "Log In"}
              className="p-2 rounded-full text-gray-500 dark:text-[#888888] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
            >
              {user ? (
                <span className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white dark:text-gray-900 leading-none">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </span>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </Link>
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
