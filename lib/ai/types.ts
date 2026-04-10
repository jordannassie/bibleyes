export type AIRequest = {
  book: string;
  bookName: string;
  chapter: number;
  translation: string;
  chapterText: string;
  verseNumber?: number;
  verseText?: string;
  question: string;
  guideId?: string;
};

export type AIResponse = {
  answer: string;
  keyVerses: string[];
  relatedReferences: string[];
  disclaimer?: string;
};

export type ChatMessage =
  | { role: "user"; content: string }
  | ({ role: "assistant" } & AIResponse)
  | { role: "error"; content: string };

export type QuickActionDef = {
  label: string;
  buildQuestion: (bookName: string, chapter: number) => string;
};

export const QUICK_ACTION_DEFS: QuickActionDef[] = [
  {
    label: "Explain",
    buildQuestion: (b, c) => `What does ${b} chapter ${c} mean and teach us?`,
  },
  {
    label: "Summarize",
    buildQuestion: (b, c) => `Please summarize ${b} chapter ${c} in simple, clear terms.`,
  },
  {
    label: "Cross references",
    buildQuestion: (b, c) => `What are the key cross references and related passages for ${b} chapter ${c}?`,
  },
  {
    label: "Apply today",
    buildQuestion: (b, c) => `How can I practically apply the lessons from ${b} chapter ${c} to my daily life?`,
  },
  {
    label: "Commentary",
    buildQuestion: (b, c) => `Provide theological commentary and historical context for ${b} chapter ${c}.`,
  },
];
