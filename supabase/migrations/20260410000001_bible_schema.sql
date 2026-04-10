-- ============================================================
-- BibleYes — Bible Schema Migration
-- ============================================================

-- 1. translations
create table if not exists public.translations (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  name        text not null,
  description text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- 2. books
create table if not exists public.books (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  short_name    text,
  book_order    integer unique not null,
  testament     text not null check (testament in ('old','new')),
  chapter_count integer not null,
  created_at    timestamptz default now()
);

-- 3. bible_verses
create table if not exists public.bible_verses (
  id               bigserial primary key,
  translation_code text not null,
  book_slug        text not null,
  book_order       integer not null,
  chapter_number   integer not null,
  verse_number     integer not null,
  verse_text       text not null,
  section_title    text,
  paragraph_break  boolean default false,
  created_at       timestamptz default now(),

  unique (translation_code, book_slug, chapter_number, verse_number)
);

-- Performance indexes
create index if not exists idx_bible_verses_lookup
  on public.bible_verses (translation_code, book_order, chapter_number, verse_number);

create index if not exists idx_bible_verses_book_chapter
  on public.bible_verses (translation_code, book_slug, chapter_number);

create index if not exists idx_bible_verses_fts
  on public.bible_verses using gin (to_tsvector('english', verse_text));

-- 4. user_bookmarks
create table if not exists public.user_bookmarks (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  translation_code text not null,
  book_slug        text not null,
  chapter_number   integer not null,
  verse_number     integer not null,
  created_at       timestamptz default now(),

  unique (user_id, translation_code, book_slug, chapter_number, verse_number)
);

-- 5. user_highlights
create table if not exists public.user_highlights (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  translation_code text not null,
  book_slug        text not null,
  chapter_number   integer not null,
  verse_number     integer not null,
  color            text default 'yellow',
  created_at       timestamptz default now(),

  unique (user_id, translation_code, book_slug, chapter_number, verse_number)
);

-- 6. user_notes
create table if not exists public.user_notes (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  translation_code text not null,
  book_slug        text not null,
  chapter_number   integer not null,
  verse_number     integer,
  note             text not null,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_user_notes_updated on public.user_notes;
create trigger on_user_notes_updated
  before update on public.user_notes
  for each row execute procedure public.handle_updated_at();

-- Seed WEB translation row
insert into public.translations (code, name, description, is_active)
values (
  'web',
  'World English Bible',
  'A modern English translation in the public domain. Accurate and readable.',
  true
)
on conflict (code) do nothing;
