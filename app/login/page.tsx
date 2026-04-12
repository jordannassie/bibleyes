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
