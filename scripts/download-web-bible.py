#!/usr/bin/env python3
"""
BibleYes — WEB Bible Downloader
Downloads all 66 books from TehShrike/world-english-bible (GitHub)
and writes them to data/source/web.json in the {b, c, v, t} format
expected by import-web-bible.ts.

Usage:
    python3 scripts/download-web-bible.py
"""

import json
import urllib.request
import sys
import os
import time

BASE_URL = "https://raw.githubusercontent.com/TehShrike/world-english-bible/master/json/{}.json"

# Map: book order (1-66) → (our slug, TehShrike filename)
BOOKS = [
    (1,  "genesis",          "genesis"),
    (2,  "exodus",           "exodus"),
    (3,  "leviticus",        "leviticus"),
    (4,  "numbers",          "numbers"),
    (5,  "deuteronomy",      "deuteronomy"),
    (6,  "joshua",           "joshua"),
    (7,  "judges",           "judges"),
    (8,  "ruth",             "ruth"),
    (9,  "1-samuel",         "1samuel"),
    (10, "2-samuel",         "2samuel"),
    (11, "1-kings",          "1kings"),
    (12, "2-kings",          "2kings"),
    (13, "1-chronicles",     "1chronicles"),
    (14, "2-chronicles",     "2chronicles"),
    (15, "ezra",             "ezra"),
    (16, "nehemiah",         "nehemiah"),
    (17, "esther",           "esther"),
    (18, "job",              "job"),
    (19, "psalms",           "psalms"),
    (20, "proverbs",         "proverbs"),
    (21, "ecclesiastes",     "ecclesiastes"),
    (22, "song-of-solomon",  "songofsolomon"),
    (23, "isaiah",           "isaiah"),
    (24, "jeremiah",         "jeremiah"),
    (25, "lamentations",     "lamentations"),
    (26, "ezekiel",          "ezekiel"),
    (27, "daniel",           "daniel"),
    (28, "hosea",            "hosea"),
    (29, "joel",             "joel"),
    (30, "amos",             "amos"),
    (31, "obadiah",          "obadiah"),
    (32, "jonah",            "jonah"),
    (33, "micah",            "micah"),
    (34, "nahum",            "nahum"),
    (35, "habakkuk",         "habakkuk"),
    (36, "zephaniah",        "zephaniah"),
    (37, "haggai",           "haggai"),
    (38, "zechariah",        "zechariah"),
    (39, "malachi",          "malachi"),
    (40, "matthew",          "matthew"),
    (41, "mark",             "mark"),
    (42, "luke",             "luke"),
    (43, "john",             "john"),
    (44, "acts",             "acts"),
    (45, "romans",           "romans"),
    (46, "1-corinthians",    "1corinthians"),
    (47, "2-corinthians",    "2corinthians"),
    (48, "galatians",        "galatians"),
    (49, "ephesians",        "ephesians"),
    (50, "philippians",      "philippians"),
    (51, "colossians",       "colossians"),
    (52, "1-thessalonians",  "1thessalonians"),
    (53, "2-thessalonians",  "2thessalonians"),
    (54, "1-timothy",        "1timothy"),
    (55, "2-timothy",        "2timothy"),
    (56, "titus",            "titus"),
    (57, "philemon",         "philemon"),
    (58, "hebrews",          "hebrews"),
    (59, "james",            "james"),
    (60, "1-peter",          "1peter"),
    (61, "2-peter",          "2peter"),
    (62, "1-john",           "1john"),
    (63, "2-john",           "2john"),
    (64, "3-john",           "3john"),
    (65, "jude",             "jude"),
    (66, "revelation",       "revelation"),
]

def download_book(book_order, slug, filename):
    url = BASE_URL.format(filename)
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            raw = json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"\n  ❌ Failed to download {slug}: {e}")
        return []

    verses = []
    for entry in raw:
        if entry.get("type") == "paragraph text":
            chapter = entry.get("chapterNumber")
            verse = entry.get("verseNumber")
            text = (entry.get("value") or "").strip()
            if chapter and verse and text:
                verses.append({
                    "b": book_order,
                    "c": chapter,
                    "v": verse,
                    "t": text,
                })
    return verses

def main():
    output_path = os.path.join(os.path.dirname(__file__), "..", "data", "source", "web.json")
    output_path = os.path.normpath(output_path)

    print("📖  BibleYes — WEB Bible Downloader")
    print(f"    Output: {output_path}\n")

    all_verses = []
    total_books = len(BOOKS)

    for i, (book_order, slug, filename) in enumerate(BOOKS, 1):
        sys.stdout.write(f"\r  Downloading [{i:2d}/{total_books}] {slug:<25}")
        sys.stdout.flush()
        verses = download_book(book_order, slug, filename)
        all_verses.extend(verses)
        # Small delay to be polite to GitHub's CDN
        time.sleep(0.15)

    print(f"\n\n✅  Downloaded {len(all_verses):,} verses across {total_books} books")
    print(f"📝  Writing to {output_path} ...")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_verses, f, ensure_ascii=False)

    size_mb = os.path.getsize(output_path) / 1024 / 1024
    print(f"✓  File written ({size_mb:.1f} MB)")
    print("\n🚀  Next step: run the importer:")
    print("    npx tsx scripts/import-web-bible.ts\n")

if __name__ == "__main__":
    main()
