-- ============================================================
-- BibleYes — Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
alter table public.translations   enable row level security;
alter table public.books          enable row level security;
alter table public.bible_verses   enable row level security;
alter table public.user_bookmarks enable row level security;
alter table public.user_highlights enable row level security;
alter table public.user_notes     enable row level security;

-- ─── Bible content: readable by everyone ─────────────────────────────────────

create policy "translations_public_read"
  on public.translations for select
  using (true);

create policy "books_public_read"
  on public.books for select
  using (true);

create policy "bible_verses_public_read"
  on public.bible_verses for select
  using (true);

-- ─── User bookmarks ───────────────────────────────────────────────────────────

create policy "bookmarks_select_own"
  on public.user_bookmarks for select
  using (auth.uid() = user_id);

create policy "bookmarks_insert_own"
  on public.user_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "bookmarks_delete_own"
  on public.user_bookmarks for delete
  using (auth.uid() = user_id);

-- ─── User highlights ──────────────────────────────────────────────────────────

create policy "highlights_select_own"
  on public.user_highlights for select
  using (auth.uid() = user_id);

create policy "highlights_insert_own"
  on public.user_highlights for insert
  with check (auth.uid() = user_id);

create policy "highlights_delete_own"
  on public.user_highlights for delete
  using (auth.uid() = user_id);

-- ─── User notes ───────────────────────────────────────────────────────────────

create policy "notes_select_own"
  on public.user_notes for select
  using (auth.uid() = user_id);

create policy "notes_insert_own"
  on public.user_notes for insert
  with check (auth.uid() = user_id);

create policy "notes_update_own"
  on public.user_notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notes_delete_own"
  on public.user_notes for delete
  using (auth.uid() = user_id);
