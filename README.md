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

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

## Environment variables

This project uses Next.js' built-in environment variable support. Variable
**names** are documented in [`.env.example`](./.env.example) — that file is
committed and contains **no secret values**. Real values live in
`.env.local` (gitignored) for local development, and in the Vercel dashboard
for deployed environments.

| Name                   | Public? | Required | Description                                                                                                                            |
| ---------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes     | No\*     | Canonical origin used to build absolute metadata URLs (Open Graph, canonical links). Falls back to `http://localhost:3000` when unset. |

\* Not required for the app to build or run, but should be set in Production
so metadata resolves to the real domain.

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
