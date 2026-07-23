import { cn } from "@/lib/utils";

/**
 * Label + error-message wrapper for a form control. The control itself
 * (input/select/textarea) is passed as a child, already wired by the caller
 * with id, aria-invalid, and aria-describedby={`${id}-error`) so the error
 * text below is announced as part of the field, not just visually shown.
 */
export function Field({
  id,
  label,
  error,
  required = false,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="gap-space-xs flex flex-col">
      <label htmlFor={id} className="text-body font-semibold">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="text-grey-500 text-small font-normal">
            {" "}
            (optional)
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-grey-500 text-small">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className={cn("text-error text-small")}>
          {error}
        </p>
      )}
    </div>
  );
}
