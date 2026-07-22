import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("border-grey-100 p-space-lg rounded-md border", className)}
    >
      {children}
    </div>
  );
}
