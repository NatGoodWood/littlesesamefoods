-- ---------------------------------------------------------------------
-- Little Sesame Foods — Staff Portal database setup
--
-- HOW TO RUN THIS:
-- Supabase Dashboard -> SQL Editor -> New query -> paste this whole file
-- -> Run.
--
-- This script is safe to run more than once — if you already set the
-- Staff Portal up before and are adding a new feature, just paste in the
-- latest version of this file and run it again. Existing tables, rows
-- and policies are left alone; only what's missing gets created.
--
-- See SUPABASE-SETUP.md for the full walkthrough.
-- ---------------------------------------------------------------------

-- =========================================================
-- 1. Tables
-- =========================================================

create table if not exists public.staff (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text,
  department text not null,
  role text not null,
  photo_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id text not null,
  participants uuid[] not null,
  sender_id uuid not null references auth.users (id) on delete cascade,
  sender_name text not null,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on public.messages (conversation_id);
create index if not exists messages_participants_idx on public.messages using gin (participants);

-- Stock listings shown on the public Home page ("What we bring in").
-- Only staff in the departments named below (or anyone marked is_admin)
-- can add, edit or remove items — see the RLS policies further down.
create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  brand text not null,
  weight text not null,
  created_by uuid references auth.users (id) on delete set null,
  created_by_name text,
  created_at timestamptz not null default now()
);

create index if not exists stock_items_category_idx on public.stock_items (category);

-- =========================================================
-- 2. Row Level Security
-- =========================================================

alter table public.staff enable row level security;
alter table public.notices enable row level security;
alter table public.messages enable row level security;
alter table public.stock_items enable row level security;

-- --- staff -------------------------------------------------
-- Any signed-in staff member can read the directory (needed so Messages
-- can list colleagues). You can only create or edit your own row.
drop policy if exists "staff_select_authenticated" on public.staff;
create policy "staff_select_authenticated"
  on public.staff for select
  using (auth.role() = 'authenticated');

drop policy if exists "staff_insert_own" on public.staff;
create policy "staff_insert_own"
  on public.staff for insert
  with check (auth.uid() = id);

drop policy if exists "staff_update_own" on public.staff;
create policy "staff_update_own"
  on public.staff for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- --- notices -------------------------------------------------
-- Any signed-in staff member can read and post. Only the original
-- author (or an admin) can edit/delete a notice.
drop policy if exists "notices_select_authenticated" on public.notices;
create policy "notices_select_authenticated"
  on public.notices for select
  using (auth.role() = 'authenticated');

drop policy if exists "notices_insert_own" on public.notices;
create policy "notices_insert_own"
  on public.notices for insert
  with check (auth.uid() = author_id);

drop policy if exists "notices_update_own_or_admin" on public.notices;
create policy "notices_update_own_or_admin"
  on public.notices for update
  using (
    auth.uid() = author_id
    or exists (select 1 from public.staff where id = auth.uid() and is_admin = true)
  );

drop policy if exists "notices_delete_own_or_admin" on public.notices;
create policy "notices_delete_own_or_admin"
  on public.notices for delete
  using (
    auth.uid() = author_id
    or exists (select 1 from public.staff where id = auth.uid() and is_admin = true)
  );

-- --- messages -------------------------------------------------
-- Only the two people in a conversation can read or write its messages.
-- Messages can't be edited or deleted once sent.
drop policy if exists "messages_select_participant" on public.messages;
create policy "messages_select_participant"
  on public.messages for select
  using (auth.uid() = any (participants));

drop policy if exists "messages_insert_participant" on public.messages;
create policy "messages_insert_participant"
  on public.messages for insert
  with check (auth.uid() = any (participants) and auth.uid() = sender_id);

-- --- stock_items -------------------------------------------------
-- Read is public — this is what powers the public Home page's "What we
-- bring in" section, which has no login. Adding, editing or removing
-- items is restricted to staff in Administration & Accounts or Sales &
-- Distribution, or anyone marked is_admin — change the department list
-- below if you want to add or remove who's allowed.
drop policy if exists "stock_items_select_public" on public.stock_items;
create policy "stock_items_select_public"
  on public.stock_items for select
  using (true);

drop policy if exists "stock_items_insert_authorized" on public.stock_items;
create policy "stock_items_insert_authorized"
  on public.stock_items for insert
  with check (
    exists (
      select 1 from public.staff
      where id = auth.uid()
        and (is_admin = true or department in ('Administration & Accounts', 'Sales & Distribution'))
    )
  );

drop policy if exists "stock_items_update_authorized" on public.stock_items;
create policy "stock_items_update_authorized"
  on public.stock_items for update
  using (
    exists (
      select 1 from public.staff
      where id = auth.uid()
        and (is_admin = true or department in ('Administration & Accounts', 'Sales & Distribution'))
    )
  );

drop policy if exists "stock_items_delete_authorized" on public.stock_items;
create policy "stock_items_delete_authorized"
  on public.stock_items for delete
  using (
    exists (
      select 1 from public.staff
      where id = auth.uid()
        and (is_admin = true or department in ('Administration & Accounts', 'Sales & Distribution'))
    )
  );

-- =========================================================
-- 3. Realtime — so Messages, the Notice Board and Stock Listings
--    update live, without a page refresh
-- =========================================================

do $$
declare
  t text;
begin
  foreach t in array array['staff', 'notices', 'messages', 'stock_items']
  loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

-- =========================================================
-- 4. Storage bucket for profile photos
-- =========================================================

insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;

-- Anyone signed in can view profile photos (so colleagues' avatars show
-- up in Messages and the Notice Board). You can only upload or replace
-- the photo whose filename matches your own user id.
drop policy if exists "profile_photos_select_authenticated" on storage.objects;
create policy "profile_photos_select_authenticated"
  on storage.objects for select
  using (bucket_id = 'profile-photos');

drop policy if exists "profile_photos_insert_own" on storage.objects;
create policy "profile_photos_insert_own"
  on storage.objects for insert
  with check (bucket_id = 'profile-photos' and auth.uid()::text = name);

drop policy if exists "profile_photos_update_own" on storage.objects;
create policy "profile_photos_update_own"
  on storage.objects for update
  using (bucket_id = 'profile-photos' and auth.uid()::text = name);

-- Done. Next: create staff accounts under Authentication -> Users, then
-- sign in at /admin. See SUPABASE-SETUP.md for the rest.
