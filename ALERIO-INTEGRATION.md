# Connecting the Staff Portal to Alerio (ERP + HRM)

This explains what's already built, what's already live, and what's
needed for a deeper "one login for both systems" setup later.

## Your two Alerio systems are already wired in

```
ERP:         https://app.alerioerp.net/auth/login
HRM/Payroll: https://app-hrm.alerioerp.net/login
```

These are set as the defaults in `src/data/settings.js`, so they work as
soon as you deploy — nothing else to configure to get to this point.

## Read this first — the honest technical picture

This website is a **static front-end** (no server of its own). Alerio is a
**separate system built by a different developer**, with its own database
of usernames and passwords that this website has no access to.

That means there are two different levels of "using two systems from one
login":

1. **One Staff Portal, separate sign-in screens (built today, works now).**
   Staff log into this website's Staff Portal once, and from there open
   the ERP or HRM/Payroll tab and sign in with their normal Alerio
   username and password. Two separate logins, but one front door.

2. **True single sign-on — one password unlocks everything (needs the
   Alerio developer's help).** This requires Alerio to support logging in
   through an API or a standard protocol (OAuth2/SAML) that this website
   can call. Only Alerio's developer can tell you whether that exists.
   See "Levelling up" below.

**This site does not, and will not, send a typed username/password from
its own form to Alerio's servers directly**, because there's no
confirmation that Alerio exposes an endpoint meant to be called that way,
or that it accepts requests from this domain (CORS). Doing that anyway
would likely just fail silently, and is not a safe way to handle someone's
real password. Everything below is built to avoid that.

## What's built and ready right now

Open `/admin` (or click "Staff Login" in the site footer). After signing
in, the Staff Portal has two tabs:

- **Website Admin** — the existing content tools (gallery link, etc).
- **ERP & HRM (Alerio)** — a smaller switcher inside this tab for **ERP**
  vs **HRM / Payroll**. Each shows that system's real Alerio login screen
  (embedded), plus an "Open in New Tab" button that always works even if
  embedding is blocked. Staff type their real Alerio username and
  password directly into Alerio's own form — this website never touches
  or stores that password.

### Test it

1. Run the site (`npm run dev`), go to `/admin`, sign in with the Staff
   Portal login (see the main `README.md` for the default).
2. Click the **ERP & HRM (Alerio)** tab, then try both the **ERP** and
   **HRM / Payroll** sub-tabs.
3. Try signing in on each with a real Alerio account.

**Likely outcome:** many login pages — including most ERP/HRM
systems — deliberately block being shown inside another site's page (a
security setting called `X-Frame-Options` or a Content-Security-Policy
`frame-ancestors` rule), specifically to prevent the kind of embedding
used here. If that's the case for Alerio, the embedded box will look
blank or show a browser warning. **This is expected, not broken** — the
"Open in New Tab" button next to it will still take staff straight to a
working Alerio login every time. If you'd rather skip the embed attempt
entirely and only show the "Open in New Tab" button, that's a one-line
style change — ask and it can be simplified.

### If the URLs ever change

**A. From the dashboard (no code, works immediately):**

1. Log into `/admin` → **ERP & HRM (Alerio)** tab.
2. Pick **ERP** or **HRM / Payroll**.
3. Paste the new URL into the link field and click **Save Link**.

This saves in that browser only — repeat on other staff computers, or use
option B to change it for everyone at once.

**B. In the code (applies to every visitor, needs a redeploy):**

Open `src/data/settings.js` and edit:

```js
export const DEFAULT_ALERIO_ERP_URL = 'https://app.alerioerp.net/auth/login'
export const DEFAULT_ALERIO_HRM_URL = 'https://app-hrm.alerioerp.net/login'
```

Save, then redeploy the site (`npm run build`, re-upload `dist/`).

## Levelling up: true single sign-on (optional, needs the Alerio developer)

If you eventually want staff to type **one** password that unlocks
everything, send the Alerio developer this exact checklist and see which
(if any) they can say yes to:

1. **Does Alerio have a login API?** A URL this website could send a
   username/password to (over HTTPS) that returns something proving the
   person is logged in (a token or session cookie) — separate from the
   page a human types into.
2. **If yes, does it allow requests from another website (CORS)?** APIs
   block requests from other domains by default; Alerio's developer would
   need to explicitly allow `https://littlesesamefoods.org` (and your
   `www` version) to call it.
3. **Does Alerio support OAuth2 or SAML single sign-on** — i.e., can this
   website redirect a user to Alerio to log in once, and have Alerio hand
   back proof of identity that both systems trust? This is the standard,
   secure way two separate systems share one login (it's how "Sign in
   with Google" works). Ask specifically whether Alerio can act as an
   **identity provider**.
4. **Alternative — the reverse direction.** Some setups do this the other
   way: Alerio is configured to trust logins from *this* website. That
   would need this site to expose user accounts Alerio can verify against
   (a real backend, which this static site doesn't currently have).

Realistically, most small custom-built ERP/HRM systems don't have (2) or
(3) built in unless the developer planned for it from the start — so the
answer may simply be "no, not without extra development." If that's the
case, the Staff Portal already built is the practical, working setup, and
is what most small businesses use in this situation.

If the Alerio developer *does* confirm an API with CORS enabled, come
back with the exact endpoint URL, request format, and response format
they give you, and a proper login form that calls it directly can be
built from that — there's no safe way to build that part in advance
without those specifics.

## Pointing your domain at all three

Once `littlesesamefoods.org` is under your control, a common setup looks
like:

| What | Address | Points to |
|---|---|---|
| Main website (this project) | `littlesesamefoods.org` | This site's hosting (Netlify/Vercel/etc.) |
| ERP (Alerio) | `app.alerioerp.net` (as given) or `erp.littlesesamefoods.org` | Alerio's hosting |
| HRM/Payroll (Alerio) | `app-hrm.alerioerp.net` (as given) or `hrm.littlesesamefoods.org` | Alerio's hosting |

The Alerio addresses you were given (`alerioerp.net`) already work as-is
and don't require any domain changes. Moving them onto your own
`littlesesamefoods.org` subdomains is optional and purely cosmetic —
ask the Alerio developer if they support it, since it means pointing DNS
at their server under your domain name.

To set this up with your domain registrar or DNS provider:

1. Log into wherever the domain's DNS is managed (this may currently be
   controlled by the Alerio developer if they purchased it — you'll need
   access transferred to you or your registrar first).
2. For the main site: add the record your hosting provider gives you
   (usually an `A` record or `CNAME` for `@`/root, plus one for `www`).
3. If you want Alerio on your own subdomain: ask the Alerio developer
   what DNS record they need — typically a `CNAME` record with host `erp`
   or `hrm` pointing at the address they give you.
4. If you do this, update the matching `DEFAULT_ALERIO_ERP_URL` /
   `DEFAULT_ALERIO_HRM_URL` in `src/data/settings.js` to the new address.

DNS changes can take a few hours to propagate — this is normal.

## Security notes

- The Staff Portal's own login (`/admin`) is a simple check meant to keep
  casual visitors out — see the note in `src/data/settings.js`. Change the
  default password before launch.
- The Alerio sign-in shown in the "ERP & HRM" tab is Alerio's own form —
  this site cannot see, log, or store what's typed into it.
- If Alerio's login page refuses to load inside the embedded box, that's
  expected — the "Open in New Tab" button is the reliable path and will
  always work.
