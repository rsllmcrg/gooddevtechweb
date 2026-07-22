# GoodDev Technology — Copy Deck

Draft copy for all five pages: Home, Services, Work, About, Contact.
Written for two audiences at once — Philippine SMEs and overseas
clients — without splitting into two separate voices.

**Status: draft, not yet approved.** Per the ticket, this needs founder
review and sign-off before the Page tickets it feeds can close. That
approval is a human step outside of what this document itself can do.

**Before this is launch-ready, three things need real input** (flagged
inline where they occur too):

1. **Work page case studies** — the three project entries are
   structural placeholders (no invented client names, industries, or
   metrics). Real projects need to go in before this page ships.
2. **About page founding story / team** — the values copy is final;
   anything about specific dates, headcount, or founder bio is a
   placeholder, not a fabricated fact.
3. **Contact details** — every page below assumes contact info (email,
   phone, social links, overlap hours) is pulled from the single
   `contactInfo` object in `content/site.ts`, not retyped per page.
   That object currently holds placeholder values (see the comment
   there) — update it once, everywhere on the site updates with it.

Button labels below reuse the exact strings already wired into
`Button`/`TextLink` usage elsewhere in the app, so the developer can
paste straight from here into JSX without reconciling wording.

---

## 1. Home

**Meta title:** GoodDev Technology — Software Development Studio in the Philippines
**Meta description:** GoodDev Technology builds web apps and custom software for Philippine SMEs and overseas teams alike — Manila-based, English-speaking, and timezone-friendly for APAC, US and EU clients.

### Hero

**H1:** A Philippine software studio built for global teams.

**Subhead:** GoodDev Technology designs and ships web and software
products for local SMEs and overseas companies alike — with the
timezone overlap, communication, and craft to make distance a
non-issue.

**Primary CTA button:** Start a project
**Secondary CTA button:** See our services

### Section — Two kinds of clients, one team

**H2:** Whether you're down the street or twelve time zones away

**H3:** Philippine businesses
We speak the same language, literally and in business — same time
zone, same market, nothing lost in translation on a call. We help
local SMEs modernize, automate, and build the software spreadsheets
can't.

**H3:** Overseas teams
Need a reliable delivery team without the overhead of hiring locally?
Our hours overlap with US Pacific mornings and UK/EU evenings, our
team works in English, and we write code the way you'd want your own
team to.

### Section — What we do

**H2:** What we do

- **Web & product development** — sites, portals, and dashboards built to last.
- **Custom software & internal tools** — the system that doesn't exist off the shelf.
- **Mobile apps** — iOS and Android, native where it matters.
- **Ongoing support & maintenance** — a team that answers when something breaks.

**CTA button:** See all services

### Section — How we work

**H2:** How we work

1. **Discover** — we learn your business before we open an editor.
2. **Design & scope** — a plan you can read, with a number attached to it.
3. **Build** — regular check-ins, no black-box months.
4. **Launch & support** — we stay reachable after go-live.

### Closing CTA band

**H2:** Have a project in mind?
Tell us what you're building — we'll reply within one business day,
wherever you're calling from.

**CTA button:** Get in touch

---

## 2. Services

**Meta title:** Services — GoodDev Technology
**Meta description:** Web apps, custom software, mobile apps, integrations, and ongoing support — built by a Philippine team that works with local SMEs and overseas companies alike.

**H1:** Services

**Intro paragraph:** From a first prototype to years of ongoing
support, we work across the stack. Pick a starting point below, or
tell us what you're building and we'll figure out the right scope
together.

### Web & Product Development

Marketing sites, customer portals, dashboards — built on modern,
boring-in-a-good-way tech that's easy to maintain long after we hand
it off.
**Good for:** SMEs launching or refreshing an online presence; startups building a first version.

### Custom Software & Internal Tools

The tool that doesn't exist off the shelf: inventory systems, booking
platforms, internal admin panels. We build software around how your
business actually works, not the other way around.
**Good for:** Operations teams outgrowing spreadsheets and generic SaaS.

### Mobile Apps

Native-feeling apps for iOS and Android, built from a single codebase
where it makes sense, native where it doesn't.
**Good for:** Consumer apps, field-service tools, companion apps to an existing product.

### Systems Integration & APIs

Payment gateways, CRMs, logistics platforms, government APIs — we
connect the systems you already use so data stops living in five
different spreadsheets.
**Good for:** Businesses whose tools don't talk to each other yet.

### Ongoing Support & Maintenance

Shipped software needs a team that answers when something breaks — or
before it does. We offer maintenance retainers sized to how much
attention your product actually needs.
**Good for:** Teams who've outgrown "whoever built it originally is unreachable."

### Section — How a project runs

**H2:** How a project runs

1. **Discover** — scope, constraints, and what "done" looks like.
2. **Design & scope** — architecture and a plan, before a proposal number.
3. **Build** — shipped in reviewable pieces, not one long silence.
4. **Launch & support** — go live, then stay live.

### Closing CTA band

**H2:** Not sure which service fits?
Tell us the problem, not the solution — we'll help you figure out the
right scope.

**CTA button:** Get in touch

---

## 3. Work

**Meta title:** Our Work — GoodDev Technology
**Meta description:** A look at the web and software products GoodDev Technology has built for Philippine SMEs and overseas clients.

**H1:** Work

**Intro paragraph:** A selection of what we've built.

> **[PLACEHOLDER — do not ship as-is]** The three entries below are
> structural placeholders showing the shape each case study should
> take. Replace with real projects (real client name or an
> anonymized description if under NDA, real industry, real outcome)
> before this page goes live. No invented client names or metrics are
> used here on purpose.

### [Project name]

**Industry:** [placeholder]
**One-line summary:** [What the client needed, in one sentence.]
[2–3 sentences: the problem, what we built, the outcome — real
numbers only, never invented ones.]
**Tags:** [Web / Mobile / Integration — whichever apply]

### [Project name]

**Industry:** [placeholder]
**One-line summary:** [What the client needed, in one sentence.]
[2–3 sentences: the problem, what we built, the outcome.]
**Tags:** [ ]

### [Project name]

**Industry:** [placeholder]
**One-line summary:** [What the client needed, in one sentence.]
[2–3 sentences: the problem, what we built, the outcome.]
**Tags:** [ ]

### Closing CTA band

**H2:** Want to be next?
**CTA button:** Start a project

---

## 4. About

**Meta title:** About — GoodDev Technology
**Meta description:** GoodDev Technology is a Philippine software studio built to work as easily with local SMEs as with overseas teams. Here's what we believe and how we work.

**H1:** About GoodDev Technology

**Intro paragraph (values-driven, safe to ship as final copy):** We
build small, senior teams around each project, write code we're
willing to put our name on, and treat "maintainable" as a feature —
not an afterthought.

> **[PLACEHOLDER]** Anything more specific than that — founding year,
> founder bio, a "why we started this" story, headcount — is a factual
> claim this document can't invent. Add the real version once the
> founder confirms it.

### Section — What we believe

**H2:** What we believe

**Senior by default**
Every project gets people who've shipped production software before, not a training ground.

**Built to last**
We optimize for the codebase you'll still like in two years, not the demo that impresses in week one.

**Plain communication**
Weekly updates you can actually read, in English, at hours that work for your calendar.

**Right-sized**
We scope for what the business needs now, and design so it doesn't have to be rebuilt for what's next.

### Section — Why Philippines

**H2:** Why a Philippines-based team

Manila gives us access to strong, English-fluent engineering talent
and a cost structure that makes serious software achievable for SMEs —
without asking overseas clients to compromise on communication or
quality. _(Overlap-hours line — pull from `contactInfo.overlapHours`
in `content/site.ts` rather than retyping it here.)_

### Section — Team

> **[PLACEHOLDER]** Team bios/photos to be added once the founder
> finalizes who's featured and how.

### Closing CTA band

**H2:** Want to work with us?
**CTA button:** Get in touch
**Secondary CTA button:** See our work

---

## 5. Contact

**Meta title:** Contact — GoodDev Technology
**Meta description:** Get in touch with GoodDev Technology. Based in Manila, working with clients across the Philippines, the US, the UK, and the EU.

**H1:** Let's talk about your project

**Intro paragraph:** Tell us what you're building. We reply within one
business day — no matter which timezone you're in.

### Contact form

| Field        | Label                      | Notes                                                                                                         |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Name         | Name                       | required                                                                                                      |
| Email        | Email                      | required                                                                                                      |
| Company      | Company                    | optional                                                                                                      |
| Project type | What are you looking for?  | options: Web app, Custom software, Mobile app, Integration, Ongoing support, Something else                   |
| Message      | Tell us about your project | placeholder text: "Timeline, budget range, or just the problem you're trying to solve — whatever you've got." |

**Submit button:** Send message
**Success message (after submit):** Thanks — we've got it. Expect a reply within one business day.

### Section — Prefer email or a call?

**H2:** Prefer email or a call?
Reach us directly — details below are the same ones in the footer,
pulled from `contactInfo` in `content/site.ts` (email, phone, overlap
hours) so they only ever need updating in one place.
