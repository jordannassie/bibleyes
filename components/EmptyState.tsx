import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
  action?: { label: string; href: string };
};

export default function EmptyState({
  title = "Content not found",
  message = "This chapter isn't available yet. Import the WEB Bible to unlock all 66 books.",
  action = { label: "Go to John 1", href: "/bible/web/john/1" },
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
