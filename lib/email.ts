import { Resend } from "resend";

/**
 * PLACEHOLDER — RESEND_API_KEY is not a real key yet. This client is fully
 * wired and will send real email as soon as a real key (and CONTACT_TO_EMAIL)
 * are set. CONTACT_FROM_EMAIL defaults to Resend's shared sending domain,
 * which works without any DNS setup — swap in a verified domain address
 * once one exists.
 */
let client: Resend | undefined;

function getClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY is not set. Copy .env.example to .env.local and fill it in.",
      );
    }
    client = new Resend(apiKey);
  }
  return client;
}

export type ContactNotificationInput = {
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
};

export async function sendContactNotification(
  input: ContactNotificationInput,
): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    throw new Error(
      "CONTACT_TO_EMAIL is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company && `Company: ${input.company}`,
    input.service && `Service: ${input.service}`,
    input.budget && `Budget: ${input.budget}`,
    "",
    input.message,
  ].filter((line): line is string => Boolean(line) || line === "");

  const result = await getClient().emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `New project inquiry from ${input.name}`,
    text: lines.join("\n"),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}
