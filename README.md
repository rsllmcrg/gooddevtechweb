# gooddevtechweb

# hi!

Marketing site for GoodDev Technology — a Philippine software development
studio. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
git clone https://github.com/rsllmcrg/gooddevtechweb.git
cd gooddevtechweb
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Other scripts

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run build`        | Create a production build                       |
| `npm run start`        | Serve the production build                      |
| `npm run lint`         | Run ESLint                                      |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Check formatting without writing changes        |
| `npm run db:migrate`   | Apply the contact-form schema to `DATABASE_URL` |

## Environment variables

This project uses Next.js' built-in environment variable support. Variable
**names** are documented in [`.env.example`](./.env.example) — that file is
committed and contains **no secret values**. Real values live in
`.env.local` (gitignored) for local development, and in the Vercel dashboard
for deployed environments.

| Name                   | Public? | Required | Description                                                                                                                            |
| ---------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes     | No\*     | Canonical origin used to build absolute metadata URLs (Open Graph, canonical links). Falls back to `http://localhost:3000` when unset. |
| `DATABASE_URL`         | No      | Yes\*\*  | Postgres connection string for contact-form submissions. Apply the schema once with `npm run db:migrate`.                              |
| `RESEND_API_KEY`       | No      | Yes\*\*  | API key for sending the contact-form notification email via [Resend](https://resend.com).                                              |
| `CONTACT_TO_EMAIL`     | No      | Yes\*\*  | Inbox the contact-form notification email is sent to.                                                                                  |
| `CONTACT_FROM_EMAIL`   | No      | No       | Sender address for that email. Defaults to Resend's shared `onboarding@resend.dev`, which needs no domain verification.                |
| `ADMIN_API_TOKEN`      | No      | Yes\*\*  | Bearer token that authorizes `GET /api/contact` (retrieving stored submissions). Generate with `openssl rand -hex 32`.                 |

\* Not required for the app to build or run, but should be set in Production
so metadata resolves to the real domain.

\*\* Not required for the app to build — the contact form's UI works
without them — but required for a submission to actually be stored or
emailed. See [Contact form pipeline](#contact-form-pipeline) below.

Notes:

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and are
  **inlined at build time** — changing them requires a rebuild. Everything
  without that prefix stays server-only.
- Never commit real values. Only `.env.example` (names only) is tracked; the
  `.gitignore` ignores all other `.env*` files.

### Local setup

```bash
cp .env.example .env.local
# then edit .env.local with your values
```

## Contact form pipeline

`POST /api/contact` (called by `components/ContactForm.tsx`) does four
things, in order:

1. **Honeypot check** — a hidden field (`website`) that real visitors never
   see or fill. If it's non-empty, the request is silently accepted (200,
   same shape as success) without touching the database or sending email.
2. **Rate limit** — at most 5 submissions per IP per 10 minutes, checked
   against recent rows in the database itself (no separate service). Over
   the limit returns `429`.
3. **Persist** — the submission is inserted into `contact_submissions`
   _before_ any email is attempted, via `lib/db/index.ts`
   (schema in `lib/db/schema.sql`, applied with `npm run db:migrate`). This
   is what makes a submission recoverable even if the notification email
   below fails entirely.
4. **Email** — a notification is sent via Resend (`lib/email.ts`). Success
   or failure is recorded back onto the row (`email_sent` / `email_error`);
   a failure here is logged (`console.error`) but does not fail the
   request, since the submission is already durably stored.

Stored submissions are retrievable via `GET /api/contact` with
`Authorization: Bearer <ADMIN_API_TOKEN>` — there's no admin UI yet, so this
is meant to be queried directly:

```bash
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" https://<site>/api/contact
```

**Without `DATABASE_URL` / `RESEND_API_KEY` / `CONTACT_TO_EMAIL` set**, the
honeypot and rate-limit checks still work, but persisting and emailing will
fail (logged, not silent) and the route returns a `500`. Set all three (see
[Environment variables](#environment-variables)) and run
`npm run db:migrate` once before relying on real submissions arriving.

## Deployment

The site is hosted on **Vercel**, connected to this GitHub repository.

- **Production** deploys automatically on every push to `main`.
- **Preview** deploys are created automatically for **every pull request** —
  the Vercel bot comments the preview URL on the PR.
- Each branch also gets a stable **staging alias**
  (`gooddevtechweb-git-<branch>-<scope>.vercel.app`) that always points at the
  latest commit on that branch — this is the shareable link for review, since
  per-commit URLs change on each push.

### One-time connection (done in the Vercel dashboard)

1. At [vercel.com/new](https://vercel.com/new), import `rsllmcrg/gooddevtechweb`.
   Vercel auto-detects Next.js — no build configuration needed.
2. Confirm **Production Branch** is `main`
   (Project → Settings → Git). Preview deploys for PRs are on by default.
3. Add environment variables under
   **Project → Settings → Environment Variables**, scoping each value to
   **Production**, **Preview**, and/or **Development** as needed
   (see [Environment variables](#environment-variables) above).
4. If **Deployment Protection** (Vercel Authentication) is enabled, preview
   URLs require login — disable it for Preview, or use a shareable link, to
   make staging URLs openly shareable.

## Project structure

```
app/         Next.js App Router routes, layouts, and global styles
components/  Reusable React components
content/     Site copy and structured content
lib/         Shared utilities and helpers
public/      Static assets served as-is
```
