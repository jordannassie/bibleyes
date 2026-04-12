"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // Hide on login page
  if (pathname === "/login") return null;

  function handleAIClick() {
    if (pathname.startsWith("/bible")) {
      window.dispatchEvent(new CustomEvent("bibleyes:toggle-ai"));
    } else {
      router.push("/bible/web/john/1?ai=open");
    }
  }

  const isActive = (prefix: string) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix);

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#141414] border-t border-gray-200 dark:border-[#2a2a2a] flex items-stretch h-16 safe-area-inset-bottom transition-colors duration-200">
      {/* Home */}
      <Link
        href="/"
        className={[
          "flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-wide transition-colors",
          isActive("/") ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-[#666666] hover:text-gray-600 dark:hover:text-[#e5e5e5]",
        ].join(" ")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/") ? 2.2 : 1.6}
            d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8M5 10v9a1 1 0 001 1h4m4 0h4a1 1 0 001-1v-9" />
        </svg>
        Home
      </Link>

      {/* Bible */}
      <Link
        href="/bible/web/john/1"
        className={[
          "flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-wide transition-colors",
          isActive("/bible") ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-[#666666] hover:text-gray-600 dark:hover:text-[#e5e5e5]",
        ].join(" ")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/bible") ? 2.2 : 1.6}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Bible
      </Link>

      {/* AI */}
      <button
        onClick={handleAIClick}
        className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-wide text-gray-400 dark:text-[#666666] hover:text-gray-600 dark:hover:text-[#e5e5e5] transition-colors"
      >
        <span className="w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
            <svg className="w-3 h-3 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </span>
        AI
      </button>

      {/* User */}
      <Link
        href={user ? "/user" : "/login"}
        className={[
          "flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-wide transition-colors",
          isActive("/user") ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-[#666666] hover:text-gray-600 dark:hover:text-[#e5e5e5]",
        ].join(" ")}
        aria-label="My Journey"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/user") ? 2.2 : 1.6}
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        {user ? "Me" : "Log In"}
      </Link>
    </nav>
  );
}
