import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ReaderControls from "@/components/ReaderControls";
import ReaderContent from "@/components/ReaderContent";
import ChapterNavButtons from "@/components/ChapterNavButtons";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import AIAssistantDrawer from "@/components/AIAssistantDrawer";
import { getChapter, getTranslations } from "@/lib/bible/queries";
import { getChapterNav } from "@/lib/bible/navigation";
import { getBook } from "@/data/books";
import type { ChapterResult } from "@/lib/bible/types";

type Params = {
  translation: string;
  book: string;
  chapter: string;
};

function extractChapterText(data: ChapterResult): string {
  return data.sections
    .map((s) => {
      const heading = s.title ? `[${s.title}]\n` : "";
      const verses = s.verses.map((v) => `${v.number}. ${v.text}`).join(" ");
      return heading + verses;
    })
    .join("\n\n");
}

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

  const bookMeta = getBook(book);
  if (!bookMeta) notFound();

  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > bookMeta.chapterCount) {
    notFound();
  }

  const [data, translations] = await Promise.all([
    getChapter(translation, book, chapterNum),
    getTranslations(),
  ]);

  const { prevRoute, nextRoute } = getChapterNav(translation, book, chapterNum);
  const chapterText = data ? extractChapterText(data) : "";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex flex-col transition-colors duration-200">
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
            message="This chapter could not be loaded. Please check your connection and try again, or start reading from John 1."
            action={{ label: "Read John 1", href: "/bible/web/john/1" }}
          />
        )}
      </main>

      <ChapterNavButtons prevRoute={prevRoute} nextRoute={nextRoute} />

      {/* AI Assistant — only shown when chapter data is available */}
      {data && (
        <AIAssistantDrawer
          bookSlug={book}
          bookName={bookMeta.name}
          chapter={chapterNum}
          translation={translation}
          chapterText={chapterText}
        />
      )}

      <Footer />
    </div>
  );
}
