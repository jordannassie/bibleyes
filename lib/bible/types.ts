import type { BookMeta } from "@/data/books";

export type { BookMeta };

export type VerseData = {
  number: number;
  text: string;
};

export type ChapterSection = {
  title?: string;
  verses: VerseData[];
};

export type ChapterResult = {
  translation: string;
  book: BookMeta;
  chapter: number;
  sections: ChapterSection[];
};

export type SearchResult = {
  translationCode: string;
  bookSlug: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  reference: string;
};

export type TranslationMeta = {
  code: string;
  name: string;
  description?: string;
};

// Supabase DB row shapes
export type DbVerse = {
  verse_number: number;
  verse_text: string;
  section_title: string | null;
  paragraph_break: boolean;
};

export type DbTranslation = {
  code: string;
  name: string;
  description: string | null;
};
