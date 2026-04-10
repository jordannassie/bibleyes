/**
 * BibleYes — WEB Bible Importer
 * ─────────────────────────────
 * Usage:  npx tsx scripts/import-web-bible.ts
 *
 * Reads data/source/web.json and upserts all content into Supabase.
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { BOOKS } from "../data/books";

// ─── Env ──────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!SUPABASE_URL || SUPABASE_URL.includes("placeholder")) {
  console.error("❌  NEXT_PUBLIC_SUPABASE_URL is not set in .env.local");
  process.exit(1);
}
if (!SERVICE_ROLE_KEY) {
  console.error("❌  SUPABASE_SERVICE_ROLE_KEY is not set in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ─── Source file ──────────────────────────────────────────────────────────────

const SOURCE_PATH = join(process.cwd(), "data", "source", "web.json");

if (!existsSync(SOURCE_PATH)) {
  console.error(`❌  Source file not found: ${SOURCE_PATH}`);
  console.error("    See data/source/README.md for instructions.");
  process.exit(1);
}

console.log("📖  Reading source file...");
const raw = JSON.parse(readFileSync(SOURCE_PATH, "utf-8"));

// ─── Normalize input formats ──────────────────────────────────────────────────

type NormalizedVerse = {
  bookOrder: number;
  bookSlug: string;
  chapter: number;
  verse: number;
  text: string;
};

function normalize(data: unknown): NormalizedVerse[] {
  // Build book order → slug lookup
  const orderToSlug: Record<number, string> = {};
  const nameToSlug: Record<string, string> = {};
  BOOKS.forEach((b) => {
    orderToSlug[b.order] = b.slug;
    nameToSlug[b.name.toLowerCase()] = b.slug;
    nameToSlug[b.shortName.toLowerCase()] = b.slug;
  });

  const verses: NormalizedVerse[] = [];

  // Format A: flat array with {b, c, v, t}
  if (Array.isArray(data) && (data[0] as Record<string, unknown>)?.b !== undefined) {
    for (const row of data as { b: number; c: number; v: number; t: string }[]) {
      const slug = orderToSlug[row.b];
      if (!slug) continue;
      verses.push({ bookOrder: row.b, bookSlug: slug, chapter: row.c, verse: row.v, text: row.t });
    }
    return verses;
  }

  // Format B: flat array with {book_id/book_name, chapter, verse, text}
  if (Array.isArray(data)) {
    for (const row of data as Record<string, unknown>[]) {
      const bookId = Number(row.book_id ?? row.b ?? 0);
      const bookName = String(row.book_name ?? row.book ?? "").toLowerCase();
      const slug = orderToSlug[bookId] ?? nameToSlug[bookName];
      const book = BOOKS.find((b) => b.slug === slug);
      if (!book || !slug) continue;
      verses.push({
        bookOrder: book.order,
        bookSlug: slug,
        chapter: Number(row.chapter ?? row.c),
        verse: Number(row.verse ?? row.v),
        text: String(row.text ?? row.t ?? ""),
      });
    }
    return verses;
  }

  // Format C: nested {books: [{name, chapters: [{chapter, verses: [{verse, text}]}]}]}
  if (typeof data === "object" && data !== null && "books" in data) {
    const nested = data as {
      books: { name: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] }[];
    };
    for (const book of nested.books) {
      const slug = nameToSlug[book.name.toLowerCase()];
      const bookMeta = BOOKS.find((b) => b.slug === slug);
      if (!bookMeta || !slug) continue;
      for (const ch of book.chapters) {
        for (const v of ch.verses) {
          verses.push({ bookOrder: bookMeta.order, bookSlug: slug, chapter: ch.chapter, verse: v.verse, text: v.text });
        }
      }
    }
    return verses;
  }

  throw new Error("Unrecognized source file format. See data/source/README.md.");
}

// ─── Main import ──────────────────────────────────────────────────────────────

const BATCH_SIZE = 500;
const TRANSLATION = "web";

async function main() {
  console.log("🔌  Connecting to Supabase...");

  // 1. Upsert translation
  const { error: trErr } = await supabase.from("translations").upsert(
    { code: TRANSLATION, name: "World English Bible", description: "A modern English translation in the public domain.", is_active: true },
    { onConflict: "code" }
  );
  if (trErr) console.warn("  ⚠️  Translation upsert:", trErr.message);
  else console.log("  ✓ Translation row ready");

  // 2. Upsert books
  const bookRows = BOOKS.map((b) => ({
    slug: b.slug,
    name: b.name,
    short_name: b.shortName,
    book_order: b.order,
    testament: b.testament,
    chapter_count: b.chapterCount,
  }));
  const { error: bookErr } = await supabase.from("books").upsert(bookRows, { onConflict: "slug" });
  if (bookErr) console.warn("  ⚠️  Books upsert:", bookErr.message);
  else console.log(`  ✓ ${bookRows.length} books ready`);

  // 3. Normalize verses
  console.log("📝  Normalizing verses...");
  const normalized = normalize(raw);
  console.log(`  ✓ ${normalized.length.toLocaleString()} verses found`);

  // 4. Insert in batches
  console.log(`📤  Inserting verses in batches of ${BATCH_SIZE}...`);
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < normalized.length; i += BATCH_SIZE) {
    const batch = normalized.slice(i, i + BATCH_SIZE).map((v) => ({
      translation_code: TRANSLATION,
      book_slug: v.bookSlug,
      book_order: v.bookOrder,
      chapter_number: v.chapter,
      verse_number: v.verse,
      verse_text: v.text,
    }));

    const { error } = await supabase
      .from("bible_verses")
      .upsert(batch, { onConflict: "translation_code,book_slug,chapter_number,verse_number" });

    if (error) {
      console.warn(`  ⚠️  Batch ${Math.ceil(i / BATCH_SIZE) + 1} error:`, error.message);
      skipped += batch.length;
    } else {
      inserted += batch.length;
    }

    const pct = Math.round(((i + batch.length) / normalized.length) * 100);
    process.stdout.write(`\r  Progress: ${pct}% (${inserted.toLocaleString()} inserted)`);
  }

  console.log(`\n\n✅  Import complete!`);
  console.log(`   Inserted : ${inserted.toLocaleString()} verses`);
  console.log(`   Skipped  : ${skipped.toLocaleString()} verses`);
  console.log(`\n🚀  Your BibleYes reader is now powered by real WEB data.`);
}

main().catch((err) => {
  console.error("\n❌  Import failed:", err);
  process.exit(1);
});
