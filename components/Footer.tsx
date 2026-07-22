import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { TextLink } from "@/components/TextLink";
import { contactInfo, siteConfig } from "@/content/site";

export function Footer() {
  const mailHref = `mailto:${contactInfo.email}`;
  const telHref = `tel:${contactInfo.phone.replace(/\s+/g, "")}`;

  return (
    <footer className="border-grey-100 border-t">
      <Container className="gap-space-xl py-space-xl md:py-space-2xl flex flex-col md:flex-row md:justify-between">
        <div className="gap-space-xs flex flex-col">
          {/* Stacked lockup suits the narrow footer column. 180px is well
              above its 110px minimum. */}
          <Logo
            lockup="stacked"
            width={180}
            alt={siteConfig.name}
            className="-ml-4"
          />
          <p className="text-grey-700 text-small">{contactInfo.city}</p>
          <p className="text-grey-700 text-small max-w-sm">
            {contactInfo.overlapHours}
          </p>
        </div>

        <div className="gap-space-xs flex flex-col">
          <TextLink href={mailHref}>{contactInfo.email}</TextLink>
          <TextLink href={telHref}>{contactInfo.phone}</TextLink>
        </div>

        <div className="gap-space-xs flex flex-col">
          {contactInfo.socials.map((social) => (
            <TextLink key={social.href} href={social.href}>
              {social.label}
            </TextLink>
          ))}
        </div>
      </Container>
    </footer>
  );
}
