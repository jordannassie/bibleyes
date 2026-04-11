import { BOOKS } from "@/data/books";
import rawVerses from "@/data/source/web.json";

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

// Slug → book order (1–66) built once at module load
const slugToOrder = new Map<string, number>(BOOKS.map((b) => [b.slug, b.order]));
const orderToBook = new Map<number, (typeof BOOKS)[0]>(BOOKS.map((b) => [b.order, b]));

// Verse map keyed by "bookOrder:chapter" — built once from the bundled JSON
const verseMap = new Map<string, Verse[]>();

for (const row of rawVerses as RawVerse[]) {
  const key = `${row.b}:${row.c}`;
  let list = verseMap.get(key);
  if (!list) {
    list = [];
    verseMap.set(key, list);
  }
  list.push({ number: row.v, text: row.t });
}

export function getChapter(bookSlug: string, chapter: number): ChapterData | null {
  const order = slugToOrder.get(bookSlug.toLowerCase());
  if (!order) return null;

  const book = orderToBook.get(order);
  if (!book) return null;

  const verses = verseMap.get(`${order}:${chapter}`);
  if (!verses || verses.length === 0) return null;

  return {
    translation: "web",
    book: bookSlug,
    bookDisplay: book.name,
    chapter,
    sections: [{ verses }],
  };
}
