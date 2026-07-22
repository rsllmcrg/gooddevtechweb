import { Button } from "@/components/Button";
import { TextLink } from "@/components/TextLink";
import { Section } from "@/components/Section";

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
          Buttons, links, and CTAs. Tab through this page to check the focus
          ring — red only ever appears on the primary button.
        </p>
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
