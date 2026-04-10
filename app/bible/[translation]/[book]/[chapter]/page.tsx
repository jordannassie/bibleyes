import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ReaderControls from "@/components/ReaderControls";
import ReaderContent from "@/components/ReaderContent";
import ChapterNavButtons from "@/components/ChapterNavButtons";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { getChapter, getTranslations } from "@/lib/bible/queries";
import { getChapterNav } from "@/lib/bible/navigation";
import { getBook } from "@/data/books";

type Params = {
  translation: string;
  book: string;
  chapter: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { book, chapter, translation } = await params;
  const bookMeta = getBook(book);
  if (!bookMeta) return { title: "BibleYes" };
  return {
    title: `${bookMeta.name} ${chapter} (${translation.toUpperCase()}) — BibleYes`,
    description: `Read ${bookMeta.name} chapter ${chapter} in the ${translation.toUpperCase()} Bible on BibleYes.`,
  };
}

export default async function BibleReaderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { translation, book, chapter: chapterStr } = await params;
  const chapterNum = Number(chapterStr);

  // Validate book exists in canon
  const bookMeta = getBook(book);
  if (!bookMeta) notFound();

  // Validate chapter number
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookMeta.chapterCount) {
    notFound();
  }

  // Fetch data + translations in parallel
  const [data, translations] = await Promise.all([
    getChapter(translation, book, chapterNum),
    getTranslations(),
  ]);

  const { prevRoute, nextRoute } = getChapterNav(translation, book, chapterNum);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <ReaderControls
        translation={translation}
        bookSlug={book}
        chapter={chapterNum}
        translations={translations}
      />

      <main className="flex-1 pb-20">
        {data ? (
          <ReaderContent data={data} />
        ) : (
          <EmptyState
            title={`${bookMeta.name} ${chapterNum} not available`}
            message="This chapter isn't in the local data yet. Import the full WEB Bible to read all 66 books, or start with John 1."
            action={{ label: "Read John 1", href: "/bible/web/john/1" }}
          />
        )}
      </main>

      <ChapterNavButtons prevRoute={prevRoute} nextRoute={nextRoute} />

      <Footer />
    </div>
  );
}
