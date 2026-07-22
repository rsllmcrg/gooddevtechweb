import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { TextLink } from "@/components/TextLink";
import { Section } from "@/components/Section";

/** Brand palette, mirroring the tokens in app/theme.css. */
const PALETTE = [
  {
    name: "Signal Red",
    hex: "#DA291C",
    token: "--color-red",
    swatch: "bg-red",
    note: "Accent only — the primary CTA and the final chevron. Pantone 485 C.",
  },
  {
    name: "Ink",
    hex: "#111111",
    token: "--color-ink",
    swatch: "bg-ink",
    note: "Body copy, headings, and the secondary button outline.",
  },
  {
    name: "Paper",
    hex: "#FFFFFF",
    token: "--color-paper",
    swatch: "bg-paper border-grey-100 border",
    note: "Page background. The full-colour logo needs this or a light neutral.",
  },
] as const;

function Example({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="gap-space-sm flex flex-col">
      <h3>{title}</h3>
      <div className="gap-space-md flex flex-wrap items-center">{children}</div>
      <pre className="bg-grey-900 p-space-md text-small text-paper overflow-x-auto rounded-md">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <Section className="gap-space-2xl flex flex-col">
      <div>
        <h1>Style guide</h1>
        <p className="text-grey-700 max-w-md">
          The brand marks and palette, then buttons, links, and CTAs. Tab
          through this page to check the focus ring — red only ever appears on
          the primary button.
        </p>
      </div>

      <div className="gap-space-xl flex flex-col">
        <h2>Logo</h2>
        <p className="text-grey-700 max-w-md">
          The <code>Logo</code> component owns the rules from the brand
          guidelines — proportions, minimum sizes, and the ½X clear space, which
          it reserves as padding. Only <code>width</code> is settable, so the
          mark cannot be stretched. Sizes below the minimum warn in development.
        </p>

        <Example
          title="Horizontal — default, for headers and wide spaces"
          code={`<Logo width={220} />`}
        >
          <Logo width={220} />
        </Example>

        <Example
          title="Stacked — for narrow or square spaces"
          code={`<Logo lockup="stacked" width={180} />`}
        >
          <Logo lockup="stacked" width={180} />
        </Example>

        <Example
          title="Icon — standalone contexts only, 32px and up"
          code={`<Logo lockup="icon" width={64} />\n<Logo lockup="icon-compact" width={24} />`}
        >
          <Logo lockup="icon" width={64} />
          <Logo lockup="icon-compact" width={24} />
        </Example>

        <div className="gap-space-sm flex flex-col">
          <h3>Reversed, on dark</h3>
          <p className="text-grey-700 text-small max-w-md">
            Full colour goes on Paper or a very light neutral. On Ink, on Signal
            Red, or over photography, use the white cut — never the full-colour
            or black one.
          </p>
          <div className="gap-space-md flex flex-wrap">
            <div className="bg-ink p-space-lg flex items-center rounded-md">
              <Logo colorway="white" width={200} />
            </div>
            <div className="bg-red p-space-lg flex items-center rounded-md">
              <Logo colorway="white" width={200} />
            </div>
          </div>
          <pre className="bg-grey-900 p-space-md text-small text-paper overflow-x-auto rounded-md">
            <code>{`<Logo colorway="white" width={200} />`}</code>
          </pre>
        </div>
      </div>

      <div className="gap-space-xl flex flex-col">
        <h2>Colour</h2>
        <p className="text-grey-700 max-w-md">
          Three colours, fixed by the guidelines and matched to the logo
          artwork. The greys below them are site scaffolding, not brand colour.
        </p>
        <ul className="gap-space-md flex flex-col">
          {PALETTE.map((colour) => (
            <li key={colour.hex} className="gap-space-md flex items-center">
              <span
                aria-hidden="true"
                className={`${colour.swatch} h-12 w-12 shrink-0 rounded-md`}
              />
              <div>
                <p className="font-semibold">
                  {colour.name}{" "}
                  <span className="text-grey-500">{colour.hex}</span>
                </p>
                <p className="text-grey-700 text-small">{colour.note}</p>
                <code className="text-grey-500 text-small">{colour.token}</code>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="gap-space-xl flex flex-col">
        <h2>Buttons</h2>

        <Example title="Primary" code={`<Button>Get in touch</Button>`}>
          <Button>Get in touch</Button>
        </Example>

        <Example
          title="Secondary"
          code={`<Button variant="secondary">Learn more</Button>`}
        >
          <Button variant="secondary">Learn more</Button>
        </Example>

        <Example
          title="Disabled"
          code={`<Button disabled>Submitting…</Button>\n<Button variant="secondary" disabled>Submitting…</Button>`}
        >
          <Button disabled>Submitting…</Button>
          <Button variant="secondary" disabled>
            Submitting…
          </Button>
        </Example>

        <Example
          title="As a CTA link"
          code={`<Button href="/contact">Start a project</Button>`}
        >
          <Button href="/contact">Start a project</Button>
        </Example>
      </div>

      <div className="gap-space-xl flex flex-col">
        <h2>Text links</h2>

        <Example
          title="Default"
          code={`<TextLink href="/about">About us</TextLink>`}
        >
          <p>
            Read more on our <TextLink href="/about">about page</TextLink>.
          </p>
        </Example>

        <Example
          title="Disabled"
          code={`<TextLink href="/about" aria-disabled="true">About us</TextLink>`}
        >
          <TextLink href="/about" aria-disabled="true">
            About us
          </TextLink>
        </Example>
      </div>
    </Section>
  );
}
