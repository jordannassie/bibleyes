// Mock devotional data — swap these fetches for real Supabase queries later

export type SavedVerse = {
  reference: string;
  text: string;
};

export type JourneyStep = "Understand" | "Live It" | "Pray";

export type VerseJourney = {
  reference: string;
  step: JourneyStep;
  date: string;
};

export type SavedPrayer = {
  reference: string;
  text: string;
  date: string;
};

export type Note = {
  reference: string;
  text: string;
  date: string;
};

export type ContinueReading = {
  book: string;
  chapter: number;
  lastVerse: string;
  lastStep: JourneyStep;
  href: string;
};

export const CONTINUE_READING: ContinueReading = {
  book: "John",
  chapter: 1,
  lastVerse: "John 1:5",
  lastStep: "Understand",
  href: "/bible/web/john/1",
};

export const SAVED_VERSES: SavedVerse[] = [
  {
    reference: "John 1:5",
    text: "The light shines in the darkness, and the darkness hasn't overcome it.",
  },
  {
    reference: "Romans 8:28",
    text: "We know that all things work together for good for those who love God.",
  },
  {
    reference: "Psalm 23:1",
    text: "Yahweh is my shepherd; I shall lack nothing.",
  },
];

export const RECENT_JOURNEYS: VerseJourney[] = [
  { reference: "John 1:5",    step: "Understand", date: "Today" },
  { reference: "Romans 8:28", step: "Live It",    date: "Yesterday" },
  { reference: "Psalm 23:1",  step: "Pray",       date: "2 days ago" },
];

export const SAVED_PRAYERS: SavedPrayer[] = [
  {
    reference: "Psalm 23:1",
    text: "Lord, you are my shepherd. I trust that I will not lack anything I need today.",
    date: "2 days ago",
  },
  {
    reference: "Romans 8:28",
    text: "Father, help me to trust that you are working all things together for my good.",
    date: "Yesterday",
  },
];

export const NOTES: Note[] = [
  {
    reference: "John 1:5",
    text: "The light always overcomes — no darkness can withstand it. A reminder for hard seasons.",
    date: "Today",
  },
  {
    reference: "Romans 8:28",
    text: "This verse helped me through a difficult week. God's plan is always good.",
    date: "Yesterday",
  },
];
