import { type ChapterData } from "@/data/bible/web";
import VerseBlock from "./VerseBlock";

type Props = {
  data: ChapterData;
};

export default function BibleReader({ data }: Props) {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Chapter title */}
      <h1 className="text-center text-2xl font-bold tracking-widest uppercase text-gray-900 mb-10">
        {data.bookDisplay} {data.chapter}
      </h1>

      {/* Sections */}
      {data.sections.map((section, si) => (
        <section key={si} className="mb-8">
          {section.title && (
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {section.title}
            </h2>
          )}
          <p className="text-lg font-serif leading-[1.9] text-gray-800">
            {section.verses.map((verse) => (
              <VerseBlock key={verse.number} verse={verse} />
            ))}
          </p>
        </section>
      ))}
    </article>
  );
}
