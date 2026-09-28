# Little Sesame Foods — Website

A React + Vite website for Little Sesame Foods, a subsidiary of Little Sesame
Group. Includes Home, About, Directors' Profile & Team, Gallery (Google
Photos embed), and a Supabase-backed Staff Portal with individual staff
logins, messaging, a notice board, and an ERP/HRM (Alerio) sign-in tab.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder produced by `npm run build` is what you upload to your
web host (Netlify, Vercel, cPanel, etc).

## Project structure

```
src/
  components/   Navbar, Footer, Layout, icons, shared UI pieces
  data/         content.js (directors/team/contact info), settings.js
  pages/        Home.jsx, About.jsx, Team.jsx, Gallery.jsx, Admin.jsx
  admin/        Staff Portal: login, profile, messages, notice board,
                website admin panel, ERP & HRM (Alerio) tab
  supabase.js   Supabase project config (see SUPABASE-SETUP.md)
public/
  logo.jpg      your uploaded Little Sesame Group logo
  team/         staff photos for the public Team page (see team/README.txt)
SUPABASE-SETUP.md      step-by-step guide to the Staff Portal's backend
ALERIO-INTEGRATION.md  step-by-step guide for the ERP/HRM sign-in tab
supabase-setup.sql     copy-paste SQL: tables, security rules, storage bucket
```

## Updating content

- **Directors & team names/roles/bios** — edit `src/data/content.js`.
- **Staff photos** — see `public/team/README.txt` for the exact filenames
  expected for each person; drop matching JPG/PNG files into `public/team/`
  and they'll show automatically. Anyone without a matching file falls back
  to a colored initials badge, so nothing breaks in the meantime.
- **Contact details in the footer** — edit `companyInfo` in
  `src/data/content.js` (the footer reads from it automatically).
- **Gallery / Google Photos link** — either edit `DEFAULT_GALLERY_URL` in
  `src/data/settings.js`, or set it live from the Staff Portal's Website
  Admin tab (see below) without redeploying.

### Adding your Google Photos album

1. Open the album in Google Photos → **Share** → **Create link** → copy it.
2. Paste it into `DEFAULT_GALLERY_URL` in `src/data/settings.js`, or paste it
   into the Gallery link field in `/admin`.

Note: Google Photos blocks most of its pages from loading inside an
`<iframe>`, so the in-page preview on the Gallery page may appear blank in
some browsers — this is a restriction on Google's side, not a bug. The
"Open Full Gallery" button always works, since it opens the album in a new
tab.

### About page image

The full-width photo near the top of the About page is a free-license
stock photo (Pexels), used as a placeholder. Swap it for a real photo of
your own warehouse or team by replacing the `src` on the `<img>` in
`src/pages/About.jsx` (look for the "Full-width feature image" comment).
The category photos on the Home page ("What we bring in") work the same
way.

## Staff Portal

Visit `/admin` (there's also a discreet "Staff Login" link in the footer).
This runs on Supabase — real individual staff accounts, not a shared
password. **See [`SUPABASE-SETUP.md`](./SUPABASE-SETUP.md) for the full
setup (about 10–15 minutes, once) — the Staff Portal won't work until
that's done**, since `src/supabase.js` starts with placeholder values.

Once set up, each staff member signs in with their own email and
password (created by management in the Supabase Dashboard) and sees:

- **My Profile** — their photo (uploadable), name, department and job
  title. This is the first thing they see after signing in.
- **Messages** — live 1:1 chat with any colleague, including directors,
  once that person has signed in at least once.
- **Notice Board** — anyone can post a notice; everyone sees it
  immediately, on any device — this is stored centrally (a shared
  Postgres database), not in one person's browser.
- **Website Admin** *(shown only to staff marked as admin)* — the gallery
  link and a read-only view of the public Directors/Team listing.
- **ERP & HRM (Alerio)** — switch between **ERP** and **HRM / Payroll**
  and sign in with their normal Alerio username and password, without
  leaving the Staff Portal. See `ALERIO-INTEGRATION.md` for details,
  including what to expect if Alerio blocks the embedded sign-in (the
  "Open in New Tab" button always works as a fallback).

**Important:** the public website (Home, About, Team, Gallery) does not
change with any of this — it keeps using the static data in
`src/data/content.js`, so it stays fast and works even before Supabase is
set up. Only `/admin` depends on Supabase.

## Tech stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Supabase (Authentication, Postgres database, Storage) — powers the
  Staff Portal only; the public website has no backend dependency
- Icons and illustrations are hand-built inline SVG, so there's nothing
  else to install or that can go missing.
