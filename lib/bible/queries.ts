import { createClient } from "@/lib/supabase/server";
import { getBook } from "@/data/books";
import { getChapter as getMockChapter } from "@/data/bible/web";
import type {
  ChapterResult,
  ChapterSection,
  DbVerse,
  SearchResult,
  TranslationMeta,
} from "./types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  return (
    url.startsWith("https://") &&
    !url.includes("placeholder") &&
    key.length > 20 &&
    !key.includes("placeholder")
  );
}

function groupVersesIntoSections(verses: DbVerse[]): ChapterSection[] {
  const sections: ChapterSection[] = [];
  let current: ChapterSection = { verses: [] };

  for (const row of verses) {
    const newTitle = row.section_title ?? undefined;

    if (newTitle && newTitle !== current.title && current.verses.length > 0) {
      sections.push(current);
      current = { title: newTitle, verses: [] };
    } else if (newTitle && current.verses.length === 0) {
      current.title = newTitle;
    }

    current.verses.push({ number: row.verse_number, text: row.verse_text });
  }

  if (current.verses.length > 0) sections.push(current);
  return sections;
}

// ─── getTranslations ─────────────────────────────────────────────────────────

export async function getTranslations(): Promise<TranslationMeta[]> {
  if (!isSupabaseConfigured()) {
    return [{ code: "web", name: "World English Bible" }];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("translations")
      .select("code, name, description")
      .eq("is_active", true)
      .order("name");

    if (!error && data?.length) return data;
  } catch {
    // Supabase unavailable
  }

  return [{ code: "web", name: "World English Bible" }];
}

// ─── getChapter ───────────────────────────────────────────────────────────────

export async function getChapter(
  translation: string,
  bookSlug: string,
  chapter: number
): Promise<ChapterResult | null> {
  const book = getBook(bookSlug);
  if (!book) return null;
  if (chapter < 1 || chapter > book.chapterCount) return null;

  // Try Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("bible_verses")
        .select("verse_number, verse_text, section_title, paragraph_break")
        .eq("translation_code", translation)
        .eq("book_slug", bookSlug)
        .eq("chapter_number", chapter)
        .order("verse_number");

      if (!error && data && data.length > 0) {
        return {
          translation,
          book,
          chapter,
          sections: groupVersesIntoSections(data as DbVerse[]),
        };
      }
    } catch {
      // Fall through to mock data
    }
  }

  // Fallback to local mock data
  const mock = getMockChapter(bookSlug, chapter);
  if (mock) {
    return {
      translation,
      book,
      chapter,
      sections: mock.sections.map((s) => ({
        title: s.title,
        verses: s.verses.map((v) => ({ number: v.number, text: v.text })),
      })),
    };
  }

  return null;
}

// ─── searchVerses ─────────────────────────────────────────────────────────────

export async function searchVerses(
  query: string,
  translation = "web",
  limit = 30
): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("bible_verses")
        .select("translation_code, book_slug, chapter_number, verse_number, verse_text")
        .eq("translation_code", translation)
        .ilike("verse_text", `%${query}%`)
        .order("book_order", { ascending: true })
        .order("chapter_number", { ascending: true })
        .order("verse_number", { ascending: true })
        .limit(limit);

      if (!error && data?.length) {
        return data.map((row) => {
          const book = getBook(row.book_slug);
          return {
            translationCode: row.translation_code,
            bookSlug: row.book_slug,
            bookName: book?.name ?? row.book_slug,
            chapter: row.chapter_number,
            verse: row.verse_number,
            text: row.verse_text,
            reference: `${book?.name ?? row.book_slug} ${row.chapter_number}:${row.verse_number}`,
          };
        });
      }
    } catch {
      // Fall through to mock search
    }
  }

  // Fallback: search mock data
  return searchMockData(query);
}

function searchMockData(query: string): SearchResult[] {
  const { JOHN_MOCK, GENESIS_MOCK, PSALM_MOCK } = getMockSearchData();
  const lower = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const chapter of [JOHN_MOCK, GENESIS_MOCK, PSALM_MOCK]) {
    const book = getBook(chapter.book);
    for (const section of chapter.sections) {
      for (const verse of section.verses) {
        if (verse.text.toLowerCase().includes(lower)) {
          results.push({
            translationCode: "web",
            bookSlug: chapter.book,
            bookName: book?.name ?? chapter.book,
            chapter: chapter.chapter,
            verse: verse.number,
            text: verse.text,
            reference: `${book?.name ?? chapter.book} ${chapter.chapter}:${verse.number}`,
          });
        }
      }
    }
  }

  return results;
}

function getMockSearchData() {
  // Lazy-import to avoid circular dep at module level
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const web = require("@/data/bible/web");
  return {
    JOHN_MOCK: web.getChapter("john", 1),
    GENESIS_MOCK: web.getChapter("genesis", 1),
    PSALM_MOCK: web.getChapter("psalm", 1),
  };
}
