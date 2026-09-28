# Setting up Supabase for the Staff Portal

The Staff Portal (`/admin`) runs on Supabase: real individual staff
logins, a live shared database (for messaging and the notice board), and
file storage for profile photos. Supabase is a hosted Postgres database
with authentication and storage built in — you don't run or host
anything yourself, and the free plan is enough for a team this size.

This takes about 10–15 minutes, once.

## 1. Create your Supabase project

1. Go to <https://supabase.com>, sign in (GitHub or email), and click
   **New project**.
2. Pick an organization (or create one), name the project something like
   `little-sesame-foods`, set a database password (save it somewhere —
   you likely won't need it day-to-day, but keep it safe), and choose a
   region close to Ghana (e.g. `eu-west-1` / London or `eu-central-1` /
   Frankfurt).
3. Click **Create new project** and wait a minute or two while it spins
   up.

## 2. Get your project's API keys

1. In your new project, go to **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** and the **anon / public** key.
3. Open `src/supabase.js` in this project and replace the placeholders:

   ```js
   const supabaseUrl = 'https://your-project-ref.supabase.co'
   const supabaseAnonKey = 'your-real-anon-key'
   ```

   The anon key is safe to ship in the website — it's designed to be
   public. Real access control comes from the Row Level Security
   policies you'll add in the next step, not from hiding this key.

## 3. Run the database setup script

1. In the Supabase Dashboard, go to **SQL Editor** → **New query**.
2. Open `supabase-setup.sql` from this project, copy its entire
   contents, paste into the SQL Editor, and click **Run**.

This one script creates everything: the `staff`, `notices` and
`messages` tables, the security rules controlling who can read/write
what, live-update ("Realtime") support for Messages and the Notice
Board, and the `profile-photos` storage bucket with its own access
rules. You only need to run it once.

## 4. Create your staff accounts

1. Go to **Authentication** → **Users** → **Add user**.
2. Enter each staff member's email and a temporary password.
3. Toggle **Auto Confirm User** on when creating each account — this
   skips the "confirm your email" step, since these are accounts you're
   creating for known staff, not public sign-ups.
4. Give each person their email + temporary password separately (in
   person, or a private message). They can change their password anytime
   with the "Forgot password?" link on the sign-in screen.

There's no self-service sign-up page by design — accounts are created by
management, the same way most company systems work.

## 5. Make yourself (or whoever runs the website) an admin

The **Website Admin** tab (gallery link, directors/team view) is only
shown to staff marked as admins — everyone else just sees My Profile,
Messages, Notice Board, and ERP & HRM.

1. Sign in once at `/admin` with your own account, and complete your
   profile (name, department, job title) when prompted. This creates
   your row in the `staff` table.
2. In Supabase Dashboard, go to **Table Editor** → `staff`.
3. Find your row, click into the `is_admin` cell, and change it from
   `false` to `true`. Press Enter/save.
4. Refresh `/admin` in your browser — the "Website Admin" tab now
   appears for you. Repeat for anyone else who should have it.

## 6. Install and run

Back in the project folder:

```bash
npm install
npm run dev
```

Go to `/admin`, sign in with one of the accounts you created in Step 4,
and you're in.

## What staff can do now

- **My Profile** — the first thing they see after signing in: their
  photo, name, department and job title, editable any time. Photo
  uploads go to Supabase Storage and update instantly.
- **Messages** — a live 1:1 chat with any colleague who has signed in at
  least once (including directors, once their accounts are created the
  same way).
- **Notice Board** — anyone can post a notice; everyone sees it
  immediately, on any device, because it's stored centrally in the
  shared database (not in one person's browser).
- **Website Admin** *(admins only)* — the gallery link and a read-only
  view of the public Directors/Team listing.
- **ERP & HRM (Alerio)** — unchanged from before; see
  `ALERIO-INTEGRATION.md`.

## A note on the public website

The public pages (Home, About, Directors & Team, Gallery) still use the
static data in `src/data/content.js` — they don't read from Supabase.
That's intentional: it keeps the public site fast and simple, with no
backend dependency for visitors. The Staff Portal is a separate,
authenticated layer on top. If you'd eventually like the public Team page
to pull live from the same `staff` table instead of `content.js`, that's
a reasonable next step — just ask.

## Costs

Supabase's free plan covers everything here comfortably for a small
team (500MB database, 1GB file storage, 50,000 monthly active users). If
you ever outgrow it, Supabase shows estimated costs before you'd need to
upgrade — there are no surprise charges.

## Troubleshooting

- **"That email and password combination was not recognized"** — double
  check the account exists under Authentication → Users, and that "Auto
  Confirm User" was ticked when it was created (otherwise the account is
  waiting on an email confirmation that was never sent anywhere, since
  this project doesn't have a public sign-up flow).
- **Signed in, but stuck on a blank screen** — open your browser's
  developer console (F12) and check for an error mentioning `staff`,
  `notices`, or `messages`. This almost always means `supabase-setup.sql`
  hasn't been run yet, or was only partially run.
- **Messages or notices don't appear on another device without
  refreshing** — go to **Database** → **Replication** in the Supabase
  Dashboard and confirm `staff`, `notices` and `messages` are all listed
  under the `supabase_realtime` publication. Step 3's script adds them
  automatically, but it's worth checking if live updates aren't working.
