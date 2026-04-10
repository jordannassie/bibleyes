# WEB Bible Source Data

Place your WEB (World English Bible) source file here before running the importer.

## Where to get the WEB Bible data

The World English Bible is in the **public domain**. Download it from one of these sources:

### Option A — Flat array format (recommended)
Download from: https://github.com/scrollmapper/bible_databases

1. Clone or download the repo
2. Find `json/t_web.json`
3. Copy it to: `data/source/web.json`

Expected shape:
```json
[
  { "b": 1, "c": 1, "v": 1, "t": "In the beginning God created the heavens and the earth." },
  { "b": 1, "c": 1, "v": 2, "t": "The earth was formless..." }
]
```

Where `b` = book number (1–66), `c` = chapter, `v` = verse, `t` = text.

### Option B — Nested JSON format
Any file matching this shape also works:
```json
{
  "books": [
    {
      "name": "Genesis",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            { "verse": 1, "text": "In the beginning..." }
          ]
        }
      ]
    }
  ]
}
```

### Option C — Verse-per-line array
```json
[
  {
    "book_name": "Genesis",
    "book_id": 1,
    "chapter": 1,
    "verse": 1,
    "text": "In the beginning..."
  }
]
```

## File location

```
bibleyes-v2/
└── data/
    └── source/
        └── web.json   ← place your file here
```

## Run the importer

Once `data/source/web.json` is in place:

```bash
# From the bibleyes-v2 project root:
npx tsx scripts/import-web-bible.ts
```

Required environment variables (set in `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ The importer uses the **service role key** to bypass RLS.
> Never expose this key in client-side code or commit it to git.

## After import

The importer will:
1. Upsert the WEB translation row
2. Upsert all 66 books
3. Insert all verses (skips duplicates)
4. Print progress as it goes

A full WEB Bible import takes ~1–2 minutes.
