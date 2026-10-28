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
-- and files are left alone; only what's missing gets created, and the
-- security rules are refreshed to the latest version.
--
-- See SUPABASE-SETUP.md for the full walkthrough.
-- ---------------------------------------------------------------------

-- =========================================================
-- 0. Permission helpers (used by the security rules below)
-- =========================================================

-- True for staff marked is_admin (Website Admin + Site Images tabs).
create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff
    where id = auth.uid() and is_admin = true
  );
$$;

-- True for staff who may manage stock listings: anyone marked is_admin,
-- plus the departments named here. To change who can manage stock, edit
-- the department list below AND STOCK_MANAGER_DEPARTMENTS in
-- src/data/settings.js, then re-run this script.
create or replace function public.can_manage_stock()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff
    where id = auth.uid()
      and (is_admin = true or department in ('Administration & Accounts', 'Sales & Distribution'))
  );
$$;

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

-- Stock listings shown on the public Products page and Home page.
create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  brand text not null,
  weight text not null,
  created_by uuid references auth.users (id) on delete set null,
  created_by_name text,
  created_at timestamptz not null default now()
);

-- Optional product photo (added in a later version, so it's an ALTER).
alter table public.stock_items add column if not exists image_url text;
alter table public.stock_items add column if not exists image_path text;

create index if not exists stock_items_category_idx on public.stock_items (category);

-- Category names are now stored as short lowercase slugs (poultry, beef,
-- fish). This converts rows saved by older versions; it does nothing if
-- there's nothing to convert.
update public.stock_items set category = 'poultry' where category = 'Poultry';
update public.stock_items set category = 'beef' where category in ('Beef', 'Beef & Meat');
update public.stock_items set category = 'fish' where category in ('Fish', 'Seafood');

-- Pictures used across the public website: home banner slides, category
-- photos, gallery photos and the About page photo. `slot` says where a
-- picture is used: 'banner', 'gallery', 'about' or 'category:<slug>'.
create table if not exists public.site_images (
  id uuid primary key default gen_random_uuid(),
  slot text not null,
  title text,
  subtitle text,
  image_url text not null,
  image_path text,
  sort_order integer not null default 0,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists site_images_slot_idx on public.site_images (slot, sort_order);

-- =========================================================
-- 2. Row Level Security
-- =========================================================

alter table public.staff enable row level security;
alter table public.notices enable row level security;
alter table public.messages enable row level security;
alter table public.stock_items enable row level security;
alter table public.site_images enable row level security;

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
  using (auth.uid() = author_id or public.is_site_admin());

drop policy if exists "notices_delete_own_or_admin" on public.notices;
create policy "notices_delete_own_or_admin"
  on public.notices for delete
  using (auth.uid() = author_id or public.is_site_admin());

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
-- Read is public — this is what powers the public Products page, which
-- has no login. Adding, editing or removing items is limited to
-- public.can_manage_stock() (see the top of this file).
drop policy if exists "stock_items_select_public" on public.stock_items;
create policy "stock_items_select_public"
  on public.stock_items for select
  using (true);

drop policy if exists "stock_items_insert_authorized" on public.stock_items;
create policy "stock_items_insert_authorized"
  on public.stock_items for insert
  with check (public.can_manage_stock());

drop policy if exists "stock_items_update_authorized" on public.stock_items;
create policy "stock_items_update_authorized"
  on public.stock_items for update
  using (public.can_manage_stock());

drop policy if exists "stock_items_delete_authorized" on public.stock_items;
create policy "stock_items_delete_authorized"
  on public.stock_items for delete
  using (public.can_manage_stock());

-- --- site_images -------------------------------------------------
-- Read is public (the website shows these). Only admins can change them.
drop policy if exists "site_images_select_public" on public.site_images;
create policy "site_images_select_public"
  on public.site_images for select
  using (true);

drop policy if exists "site_images_insert_admin" on public.site_images;
create policy "site_images_insert_admin"
  on public.site_images for insert
  with check (public.is_site_admin());

drop policy if exists "site_images_update_admin" on public.site_images;
create policy "site_images_update_admin"
  on public.site_images for update
  using (public.is_site_admin());

drop policy if exists "site_images_delete_admin" on public.site_images;
create policy "site_images_delete_admin"
  on public.site_images for delete
  using (public.is_site_admin());

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
-- 4. Storage: staff profile photos
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

-- =========================================================
-- 5. Storage: website pictures (banner, categories, gallery, about,
--    product photos)
-- =========================================================

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- Pictures are public to view (the website shows them to everyone).
-- Uploading/removing: admins can write anywhere in the bucket; staff
-- who manage stock can only write inside the products/ folder.
drop policy if exists "site_images_files_select" on storage.objects;
create policy "site_images_files_select"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site_images_files_insert" on storage.objects;
create policy "site_images_files_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'site-images'
    and (
      public.is_site_admin()
      or ((storage.foldername(name))[1] = 'products' and public.can_manage_stock())
    )
  );

drop policy if exists "site_images_files_update" on storage.objects;
create policy "site_images_files_update"
  on storage.objects for update
  using (
    bucket_id = 'site-images'
    and (
      public.is_site_admin()
      or ((storage.foldername(name))[1] = 'products' and public.can_manage_stock())
    )
  );

drop policy if exists "site_images_files_delete" on storage.objects;
create policy "site_images_files_delete"
  on storage.objects for delete
  using (
    bucket_id = 'site-images'
    and (
      public.is_site_admin()
      or ((storage.foldername(name))[1] = 'products' and public.can_manage_stock())
    )
  );

-- Done. Next: create staff accounts under Authentication -> Users, then
-- sign in at /admin. See SUPABASE-SETUP.md for the rest.
