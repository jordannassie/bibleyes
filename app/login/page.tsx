"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const LOGO_URL =
  "https://dhuidtxkthlvkqyuxbkw.supabase.co/storage/v1/object/public/BibleYes/logos/ChatGPT%20Image%20Apr%2010,%202026,%2003_24_13%20PM.png";

export default function LoginPage() {
  const { user, login, loginAsDemo } = useAuth();
  const router = useRouter();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // Already logged in → send to My Journey
  useEffect(() => {
    if (user) router.replace("/user");
  }, [user, router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/user");
    } else {
      setError(result.error ?? "Login failed.");
    }
  }

  function handleDemo() {
    loginAsDemo();
    router.push("/user");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={LOGO_URL}
            alt="BibleYes"
            width={64}
            height={64}
            className="rounded-2xl shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome to BibleYes
          </h1>
          <p className="text-sm text-gray-400 dark:text-[#888] mt-2 text-center leading-relaxed">
            Read a verse. Understand it. Live it. Pray it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1c1c1c] px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#555] outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-[#888] uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1c1c1c] px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-[#555] outline-none focus:border-gray-400 dark:focus:border-[#555] transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Log In */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full py-3 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors disabled:opacity-40"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <span className="flex-1 h-px bg-gray-100 dark:bg-[#2a2a2a]" />
          <span className="text-xs text-gray-300 dark:text-[#555]">or</span>
          <span className="flex-1 h-px bg-gray-100 dark:bg-[#2a2a2a]" />
        </div>

        {/* Google — not connected yet */}
        <button
          type="button"
          disabled
          className="w-full flex items-center justify-center gap-3 rounded-full border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1c1c1c] py-3 text-sm font-semibold text-gray-700 dark:text-[#ccc] opacity-60 cursor-not-allowed mb-3"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Demo login */}
        <button
          onClick={handleDemo}
          className="w-full rounded-full border border-gray-200 dark:border-[#333] py-3 text-sm font-semibold text-gray-700 dark:text-[#ccc] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition-colors"
        >
          Continue as Demo User
        </button>

        {/* Hint */}
        <p className="text-center text-[11px] text-gray-300 dark:text-[#555] mt-6 leading-relaxed">
          Demo: demo@bibleyes.com / demo123
        </p>
      </div>
    </div>
  );
}
