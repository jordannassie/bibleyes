"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { MockUser } from "@/lib/auth/types";

// ── Demo credentials ────────────────────────────────────────────────────────
// TODO: Replace with real Supabase auth when ready
const DEMO_EMAIL    = "demo@bibleyes.com";
const DEMO_PASSWORD = "demo123";
const STORAGE_KEY   = "bibleyes-user";

const DEMO_USER: MockUser = {
  id:     "demo-user",
  name:   "Jordan",
  email:  "demo@bibleyes.com",
  plan:   "Free",
  streak: 12,
  avatar: "",
  isDemo: true,
};

// ── Context type ─────────────────────────────────────────────────────────────
type AuthContextType = {
  user: MockUser | null;
  /** Returns success + optional error string */
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsDemo: () => void;
  logout: () => void;
  updateUser: (patch: Partial<Pick<MockUser, "name" | "email" | "avatar">>) => void;
};

const AuthContext = createContext<AuthContextType>({
  user:        null,
  login:       () => ({ success: false }),
  loginAsDemo: () => {},
  logout:      () => {},
  updateUser:  () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// ── Provider ──────────────────────────────────────────────────────────────────
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function persist(u: MockUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      persist(DEMO_USER);
      return { success: true };
    }
    return { success: false, error: "Use the demo login for now." };
  }

  function loginAsDemo() {
    persist(DEMO_USER);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  function updateUser(patch: Partial<Pick<MockUser, "name" | "email" | "avatar">>) {
    if (!user) return;
    persist({ ...user, ...patch });
  }

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
