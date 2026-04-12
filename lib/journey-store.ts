// localStorage-based verse journey store
// TODO: Replace with Supabase writes when auth is live

export type JourneyStep = "Understand" | "Live It" | "Pray";

export type JourneyEntry = {
  reference: string;
  step: JourneyStep;
  timestamp: number;
};

const STORAGE_KEY = "bibleyes-journeys";
const MAX_ENTRIES = 20;

export function saveJourneyEntry(entry: Omit<JourneyEntry, "timestamp">): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getJourneyEntries();
    // Remove duplicate (same verse + step), prepend fresh entry
    const filtered = existing.filter(
      (e) => !(e.reference === entry.reference && e.step === entry.step)
    );
    const updated: JourneyEntry[] = [
      { ...entry, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail — localStorage not available
  }
}

export function getJourneyEntries(): JourneyEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JourneyEntry[]) : [];
  } catch {
    return [];
  }
}

export function formatRelativeDate(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours   = Math.floor(diff / 3_600_000);
  const days    = Math.floor(diff / 86_400_000);
  if (minutes < 2)  return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  if (days === 1)   return "Yesterday";
  return `${days} days ago`;
}
