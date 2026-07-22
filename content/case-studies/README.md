# Case studies

One file per case study. The filename becomes the URL:
`content/case-studies/farmia-logistics-api.mdx` → `/work/farmia-logistics-api`.

Adding one requires **no code changes** — create the file, drop any images in
`public/case-studies/<slug>/`, and it appears on `/work` and gets its own page.

## Anatomy

YAML frontmatter carries the structured data the page chrome renders (header,
stack chips, stat row, screenshot gallery). The MDX body carries the narrative
— conventionally `## The problem`, `## The approach`, `## The outcome`, but any
markdown works, including tables, code fences, and lists (GFM is enabled).

The schema lives in [`lib/case-studies.ts`](../../lib/case-studies.ts) and is
the source of truth. A malformed file **fails `next build`** with the file and
field named — including typo'd keys, which are rejected rather than ignored.

## Frontmatter fields

### Required

| Field      | Type     | Notes                                             |
| ---------- | -------- | ------------------------------------------------- |
| `title`    | string   | The headline. Not the client's name — the result. |
| `summary`  | string   | One sentence. Used on `/work` and as `<meta>`.    |
| `industry` | string   | Sector. Stands in for the client on NDA work.     |
| `role`     | string   | e.g. `Full Stack Developer`                       |
| `year`     | number   | e.g. `2024`                                       |
| `stack`    | string[] | At least one entry.                               |

### Optional — the page degrades gracefully when these are absent

| Field          | Type    | Notes                                                      |
| -------------- | ------- | ---------------------------------------------------------- |
| `order`        | number  | Sort position on `/work`, ascending. Unset sorts last.     |
| `client`       | string  | Name the client only when they've agreed to be named.      |
| `confidential` | boolean | `true` shows the anonymity note and forbids `client`.      |
| `liveUrl`      | url     | Renders a link to the public site.                         |
| `cover`        | image   | Hero image; also the OpenGraph image.                      |
| `outcomes`     | list    | `{ label, value }` — renders a stat row. Omit to hide it.  |
| `screenshots`  | image[] | Renders a "Screens" section. Omit to hide it.              |
| `draft`        | boolean | `true` keeps the file out of the site without deleting it. |

An `image` is `{ src, alt, caption? }`. `src` is a path under `public/`, and
`alt` is **required** — there is no way to publish an image without it. Width
and height are read off the file at build time, so you never write them, and
`next/image` reserves exact space. A missing file fails the build.

## Confidentiality

Per the client brief: never name a client or quote a metric you can't stand
behind. Set `confidential: true` and let `industry` do the work — the schema
rejects a file that sets both `confidential` and `client`.

## Example

```yaml
---
title: Shipment tracking and waybills, wired straight into checkout
summary: Integrated a courier's APIs so tracking stopped being manual work.
client: Farmia
industry: Agricultural eCommerce
role: Full Stack Developer
year: 2024
order: 1
liveUrl: https://farmia.ph/
stack: [Python, Django, PostgreSQL]
cover:
  src: /case-studies/farmia-logistics-api/cover.png
  alt: The order dashboard showing shipments with live courier status labels.
screenshots:
  - src: /case-studies/farmia-logistics-api/tracking.png
    alt: An order's detail view with a timeline of courier scan events.
    caption: Support answers "where is it?" without leaving the admin.
---
```
