import type { ChapterResult } from "@/lib/bible/types";
import VerseRow from "./VerseRow";

type Props = {
  data: ChapterResult;
};

export default function ReaderContent({ data }: Props) {
  const chapterText = data.sections
    .flatMap((s) => s.verses)
    .map((v) => `${v.number}. ${v.text}`)
    .join("\n");

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Chapter title */}
      <h1 className="text-center text-2xl font-bold tracking-widest uppercase text-gray-900 dark:text-white mb-10">
        {data.book.name} {data.chapter}
      </h1>

      {/* Sections */}
      {data.sections.map((section, si) => (
        <section key={si} className="mb-8">
          {section.title && (
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h2>
          )}
          <p className="text-lg font-serif leading-[1.95] text-gray-800 dark:text-white">
            {section.verses.map((verse) => (
              <VerseRow
                key={verse.number}
                verse={verse}
                translationCode={data.translation}
                bookSlug={data.book.slug}
                bookName={data.book.name}
                chapter={data.chapter}
                chapterText={chapterText}
              />
            ))}
          </p>
        </section>
      ))}
    </article>
  );
}
