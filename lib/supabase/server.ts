import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || url.includes("placeholder")) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL — add it to .env.local (see .env.example)"
    );
  }
  if (!key || key.includes("placeholder")) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY — add it to .env.local (see .env.example)"
    );
  }

  return { url, key };
}

export async function createClient() {
  const { url, key } = getEnv();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server component — cookie writes are ignored
        }
      },
    },
  });
}

// ─── Future feature table types ───────────────────────────────────────────────

export type Note = {
  id: string;
  user_id: string;
  translation_code: string;
  book_slug: string;
  chapter_number: number;
  verse_number?: number;
  note: string;
  created_at: string;
  updated_at: string;
};

export type Highlight = {
  id: string;
  user_id: string;
  translation_code: string;
  book_slug: string;
  chapter_number: number;
  verse_number: number;
  color: string;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  translation_code: string;
  book_slug: string;
  chapter_number: number;
  verse_number: number;
  created_at: string;
};

export type Profile = {
  id: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
};
