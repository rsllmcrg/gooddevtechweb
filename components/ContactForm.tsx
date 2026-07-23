"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000–$15,000",
  "$15,000–$50,000",
  "$50,000+",
  "Not sure yet",
];

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, like you@example.com.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a bit about your project.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add a bit more detail — at least 20 characters.";
  }

  return errors;
}

const inputClasses = (hasError: boolean) =>
  cn(
    "w-full rounded-md border px-space-md py-space-sm text-body",
    "bg-paper text-ink placeholder:text-grey-500",
    "focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-paper",
    "transition-colors duration-150",
    hasError ? "border-error" : "border-grey-300",
  );

export function ContactForm({ services }: { services: string[] }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  function updateField<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormValues) {
    if (!attempted) return;
    const fieldErrors = validate(values);
    setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    const foundErrors = validate(values);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      setStatus("idle");
      // Move focus to the error summary so screen reader users land right
      // on the list of what needs fixing, instead of staying wherever they
      // last were (often the submit button).
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-grey-100 bg-grey-100/30 gap-space-xs p-space-lg flex flex-col rounded-md border"
      >
        <p className="text-h4-sm font-semibold">Message sent</p>
        <p className="text-grey-700">
          Thanks — we&apos;ve got it. Expect a reply within one business day.
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(
    ([, message]) => message,
  ) as [keyof FormValues, string][];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="gap-space-lg flex flex-col"
    >
      {attempted && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-error bg-error/5 p-space-md rounded-md border focus:outline-none"
        >
          <p className="text-error font-semibold">
            There&apos;s a problem with your submission
          </p>
          <ul className="text-error text-small mt-space-xs list-inside list-disc">
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`} className="underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="border-error bg-error/5 p-space-md rounded-md border"
        >
          <p className="text-error font-semibold">Something went wrong</p>
          <p className="text-error text-small mt-space-xs">
            We couldn&apos;t send your message. Please try again, or email us
            directly.
          </p>
        </div>
      )}

      <Field id="name" label="Name" required error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          onBlur={() => handleBlur("name")}
          className={inputClasses(Boolean(errors.name))}
        />
      </Field>

      <Field id="email" label="Email" required error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() => handleBlur("email")}
          className={inputClasses(Boolean(errors.email))}
        />
      </Field>

      <Field id="company" label="Company">
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          className={inputClasses(false)}
        />
      </Field>

      <div className="gap-space-lg grid grid-cols-1 sm:grid-cols-2">
        <Field id="service" label="Service of interest">
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => updateField("service", event.target.value)}
            className={inputClasses(false)}
          >
            <option value="">Not sure yet</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </Field>

        <Field id="budget" label="Budget range">
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            className={inputClasses(false)}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Project description"
        required
        error={errors.message}
        hint="Timeline, budget range, or just the problem you're trying to solve — whatever you've got."
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={cn(
            "message-hint",
            errors.message && "message-error",
          )}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          className={cn(inputClasses(Boolean(errors.message)), "resize-y")}
        />
      </Field>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="self-start"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
