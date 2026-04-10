import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );
}

// ─── Future feature placeholders ─────────────────────────────────────────────
// These types describe the Supabase tables you'll create later.

export type Note = {
  id: string;
  user_id: string;
  book: string;
  chapter: number;
  verse: number;
  content: string;
  created_at: string;
};

export type Highlight = {
  id: string;
  user_id: string;
  book: string;
  chapter: number;
  verse: number;
  color: string;
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  book: string;
  chapter: number;
  verse: number;
  label?: string;
  created_at: string;
};

export type Profile = {
  id: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
};
