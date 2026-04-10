import { BOOKS, getBook, getBookByOrder } from "@/data/books";

export type ChapterNav = {
  prevRoute: string | null;
  nextRoute: string | null;
};

export function getChapterNav(
  translation: string,
  bookSlug: string,
  chapter: number
): ChapterNav {
  const book = getBook(bookSlug);
  if (!book) return { prevRoute: null, nextRoute: null };

  let prevRoute: string | null = null;
  let nextRoute: string | null = null;

  // Previous
  if (chapter > 1) {
    prevRoute = `/bible/${translation}/${bookSlug}/${chapter - 1}`;
  } else {
    const prevBook = getBookByOrder(book.order - 1);
    if (prevBook) {
      prevRoute = `/bible/${translation}/${prevBook.slug}/${prevBook.chapterCount}`;
    }
  }

  // Next
  if (chapter < book.chapterCount) {
    nextRoute = `/bible/${translation}/${bookSlug}/${chapter + 1}`;
  } else {
    const nextBook = getBookByOrder(book.order + 1);
    if (nextBook) {
      nextRoute = `/bible/${translation}/${nextBook.slug}/1`;
    }
  }

  return { prevRoute, nextRoute };
}

export function formatReference(
  bookName: string,
  chapter: number,
  verse?: number
): string {
  return verse !== undefined
    ? `${bookName} ${chapter}:${verse}`
    : `${bookName} ${chapter}`;
}

export function buildReaderRoute(
  translation: string,
  bookSlug: string,
  chapter: number
): string {
  return `/bible/${translation}/${bookSlug}/${chapter}`;
}

export { BOOKS };
