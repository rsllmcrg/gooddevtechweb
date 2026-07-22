# GoodDev Tech — logo usage guidelines

Version 1.0 · July 2026

---

## The mark

Three chevrons moving right. They read two ways at once: as stacked layers — the
service stack from front end through integration to cloud — and as forward
motion, delivery. The final chevron is red because the last layer is the one
the client actually sees.

The mark is used with the wordmark in almost all cases. It stands alone only
where the brand is already established in context: app icons, favicons, social
avatars, and merchandise.

---

## Lockups

| Lockup | Use for |
| --- | --- |
| **Horizontal** | Default. Website headers, email signatures, letterhead, slide masters, invoices. |
| **Stacked** | Narrow or square spaces — mobile splash screens, portrait ads, event banners, merchandise. |
| **Icon** | Standalone contexts only: app icons, favicons, social avatars, watermarks. |

There are two icon cuts. The **primary** icon has three chevrons and is used at
32 px and above. The **compact** icon has two chevrons with wider gaps, cut
specifically for 16–24 px, where three chevrons blur into a single smudge. Use
the compact cut for favicons and small UI chrome. Do not use it above 24 px.

---

## Colour

| Name | Hex | RGB | CMYK | Pantone |
| --- | --- | --- | --- | --- |
| **Signal Red** | `#DA291C` | 218, 41, 28 | 0, 95, 100, 0 | 485 C |
| **Ink** | `#111111` | 17, 17, 17 | 0, 0, 0, 100 | Black 6 C (approx.) |
| **Paper** | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | — |

Signal Red is matched to Pantone 485 C, so spot-colour print jobs match the
screen colour without guesswork. For large solid areas of Ink in print, use a
rich black build of 60 / 40 / 40 / 100 rather than 100 % K — flat 100 % K looks
washed out across a large area. For text and the logo itself, 100 % K is correct.

Red is an accent, not a field colour. It carries the final chevron and the word
"Tech" and nothing else in the logo. Resist using it for large background panels.

### Which version to use

- **Full colour** on white or very light neutral backgrounds. This is the default.
- **Monochrome black** for single-colour print, faxes, engraving, embroidery,
  stamps, and any document that may be photocopied.
- **Monochrome white** (reversed) on Ink, on Signal Red, on photography, and on
  any dark background.

On a photograph, place the reversed logo over an area of consistent tone. If the
image is busy, the logo needs either a solid panel behind it or a different
crop — not a drop shadow.

---

## Clear space

Let **X** be the height of the chevron mark in the lockup you are using.

Keep clear space of at least **½ X** on all four sides. Nothing enters this
area — no text, no rules, no other logos, no image edges. On the horizontal
lockup, measure X from the top of the tallest chevron to the bottom of the
lowest.

More space is always fine. Less is not.

---

## Minimum sizes

| Asset | Screen | Print |
| --- | --- | --- |
| Horizontal lockup | 140 px wide | 32 mm wide |
| Stacked lockup | 110 px wide | 25 mm wide |
| Icon (primary) | 32 px | 8 mm |
| Icon (compact) | 16 px | not for print |

Below 140 px wide the horizontal wordmark stops resolving — the counters in
"GoodDev" fill in and it reads as a grey bar. If you have less room than that,
switch to the icon rather than shrinking the lockup.

---

## Misuse

Do not:

- Stretch, squash, or otherwise change the proportions
- Rotate the logo, or set it on an angle
- Recolour it — including "brand-adjacent" reds, gradients, or team colours
- Add effects: drop shadows, glows, bevels, outlines, or strokes
- Rebuild the wordmark by typing it in Inter — the delivered art is outlined and
  optically adjusted, and retyping will not match
- Change the spacing between the mark and the wordmark
- Place the full-colour logo on a dark or mid-tone background — use the reversed version
- Box the logo in a container it was not designed for
- Use the compact icon above 24 px, or the primary icon below 32 px

---

## Typography

**Inter** is the brand typeface — Regular, Medium, and SemiBold. It is licensed
under the SIL Open Font License 1.1, which permits commercial use, web
embedding, and redistribution at no cost. No licence needs to be purchased and
none needs to be tracked.

The wordmark is set in **Inter Display SemiBold** with tracking of −1.2 %, then
converted to outlines. This is why the delivered files carry no font dependency:
they render identically on a machine that has never had Inter installed.

Suggested web stack:

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
             Roboto, Helvetica, Arial, sans-serif;
```

Inter Display is the optical cut intended for headlines at roughly 24 px and
above. Inter (the text cut) is intended for body copy. Using Display for body
text will look slightly too tight.

---

## File formats

| Folder | Contents | Use |
| --- | --- | --- |
| `source/svg/` | Master vector art, all lockups and colourways | Editable source. Opens in Illustrator, Figma, Inkscape, Affinity. |
| `png/web/` | Transparent PNG, 400–2400 px wide | Web, apps, slides, documents |
| `png/icon/` | Transparent PNG 16–1024 px, plus `favicon.ico` | App icons, favicons, UI |
| `png/social/` | Square avatars on solid Red and Ink | Social profile images |
| `jpeg/` | White-background JPEG, 300 dpi tagged | Where JPEG is mandated. Prefer PNG or PDF wherever possible. |
| `print/` | Vector PDF | Print production, hand off to any printer |

**On the `.ai` request.** `.ai` is Adobe's proprietary format and cannot be
generated outside Illustrator. The SVG files are the editable vector source and
satisfy the "or other editable vector format" requirement — they open natively
in Illustrator, Figma, Inkscape, and Affinity Designer with all paths live. If a
stakeholder specifically needs the `.ai` extension, open the SVG in Illustrator
and save-as; it is a one-step conversion with no loss.

**On JPEG.** JPEG cannot store transparency and its compression puts visible
artefacts around hard edges like the chevron tips. It is included because it was
requested, but PNG for screen and PDF for print are the correct choices in
nearly every case.

All artwork is fully outlined. There are no live text elements and no font
references anywhere in the source, so nothing can reflow or substitute.

---

## Questions this document does not answer

Secondary palette, iconography, photography direction, slide templates, and
motion behaviour are all out of scope for this ticket. They are the natural next
piece of work if the brand needs to extend beyond the logo.
