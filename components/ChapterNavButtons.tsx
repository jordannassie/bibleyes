import Link from "next/link";

type Props = {
  prevRoute: string | null;
  nextRoute: string | null;
};

export default function ChapterNavButtons({ prevRoute, nextRoute }: Props) {
  const base = "fixed top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-all";
  const active = `${base} bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400`;
  const disabled = `${base} bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed`;

  const PrevIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const NextIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <>
      {prevRoute ? (
        <Link href={prevRoute} aria-label="Previous chapter" className={`left-3 lg:left-8 ${active}`}>
          <PrevIcon />
        </Link>
      ) : (
        <div className={`left-3 lg:left-8 ${disabled}`} aria-disabled>
          <PrevIcon />
        </div>
      )}

      {nextRoute ? (
        <Link href={nextRoute} aria-label="Next chapter" className={`right-3 lg:right-8 ${active}`}>
          <NextIcon />
        </Link>
      ) : (
        <div className={`right-3 lg:right-8 ${disabled}`} aria-disabled>
          <NextIcon />
        </div>
      )}
    </>
  );
}
