import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

export function Section({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn("py-space-xl md:py-space-2xl lg:py-space-3xl", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
