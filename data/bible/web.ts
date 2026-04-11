import { BOOKS } from "@/data/books";

export type Verse = {
  number: number;
  text: string;
};

export type Section = {
  title?: string;
  verses: Verse[];
};

export type ChapterData = {
  translation: string;
  book: string;
  bookDisplay: string;
  chapter: number;
  sections: Section[];
};

type RawVerse = { b: number; c: number; v: number; t: string };

// Slug → book order lookup built once at module load
const slugToOrder = new Map<string, number>(BOOKS.map((b) => [b.slug, b.order]));
const orderToBook = new Map<number, (typeof BOOKS)[0]>(BOOKS.map((b) => [b.order, b]));

// Verse map keyed by "bookOrder:chapter" — populated lazily on first getChapter call
let verseMap: Map<string, Verse[]> | null = null;

function ensureVerseMap(): Map<string, Verse[]> {
  if (verseMap) return verseMap;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw: RawVerse[] = require("@/data/source/web.json");
  verseMap = new Map<string, Verse[]>();

  for (const row of raw) {
    const key = `${row.b}:${row.c}`;
    let list = verseMap.get(key);
    if (!list) {
      list = [];
      verseMap.set(key, list);
    }
    list.push({ number: row.v, text: row.t });
  }

  return verseMap;
}

export function getChapter(bookSlug: string, chapter: number): ChapterData | null {
  const order = slugToOrder.get(bookSlug.toLowerCase());
  if (!order) return null;

  const book = orderToBook.get(order);
  if (!book) return null;

  const map = ensureVerseMap();
  const verses = map.get(`${order}:${chapter}`);
  if (!verses || verses.length === 0) return null;

  return {
    translation: "web",
    book: bookSlug,
    bookDisplay: book.name,
    chapter,
    sections: [{ verses }],
  };
}
