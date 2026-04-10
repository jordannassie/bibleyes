import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ReaderControls from "@/components/ReaderControls";
import BibleReader from "@/components/BibleReader";
import ChapterNavButtons from "@/components/ChapterNavButtons";
import Footer from "@/components/Footer";
import { getChapter, getAdjacentChapters } from "@/data/bible/web";

type Params = {
  translation: string;
  book: string;
  chapter: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { book, chapter, translation } = await params;
  const data = getChapter(book, Number(chapter));
  if (!data) return { title: "BibleYes" };
  return {
    title: `${data.bookDisplay} ${data.chapter} (${translation.toUpperCase()}) — BibleYes`,
    description: `Read ${data.bookDisplay} chapter ${data.chapter} in the ${translation.toUpperCase()} translation on BibleYes.`,
  };
}

export default async function BibleReaderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { translation, book, chapter } = await params;
  const chapterNum = Number(chapter);

  const data = getChapter(book, chapterNum);
  if (!data) notFound();

  const { prev, next } = getAdjacentChapters(book, chapterNum);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <ReaderControls
        translation={translation}
        book={book}
        chapter={chapterNum}
      />

      <main className="flex-1 pb-20">
        <BibleReader data={data} />
      </main>

      <ChapterNavButtons
        translation={translation}
        book={book}
        prevChapter={prev}
        nextChapter={next}
      />

      <Footer />
    </div>
  );
}
