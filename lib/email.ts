/**
 * Notification recipients for contact-form submissions. Override at deploy
 * time with a comma-separated CONTACT_TO_EMAIL if these should ever change
 * without a code deploy.
 */
const DEFAULT_RECIPIENTS = [
  "roselle.macaraig22@gmail.com",
  "stehencoronel0913@gmail.com",
];

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

function getApiKey(): string {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error(
      "BREVO_API_KEY is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return apiKey;
}

export type ContactNotificationInput = {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(input: ContactNotificationInput): string {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ...(input.company ? ([["Company", input.company]] as [string, string][]) : []),
    ...(input.service ? ([["Project type", input.service]] as [string, string][]) : []),
    ...(input.budget ? ([["Budget", input.budget]] as [string, string][]) : []),
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #e5e5e5;color:#111;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h1 style="font-size:20px;margin:0 0 16px;color:#111;">New project inquiry</h1>
      <p style="font-size:14px;color:#444;margin:0 0 20px;">
        ${escapeHtml(input.name)} submitted the contact form on GoodDev Technology.
      </p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;">
        ${rowsHtml}
      </table>
      <div style="margin-top:20px;">
        <p style="font-size:14px;color:#666;margin:0 0 4px;">Message</p>
        <p style="font-size:14px;color:#111;white-space:pre-wrap;border:1px solid #e5e5e5;border-radius:6px;padding:12px 16px;margin:0;">${escapeHtml(input.message)}</p>
      </div>
      <p style="font-size:12px;color:#999;margin-top:24px;">
        Reply directly to this email to respond to ${escapeHtml(input.name)} — reply-to is set to ${escapeHtml(input.email)}.
      </p>
    </div>`;
}

function buildText(input: ContactNotificationInput): string {
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    input.company && `Company: ${input.company}`,
    input.service && `Project type: ${input.service}`,
    input.budget && `Budget: ${input.budget}`,
    "",
    input.message,
  ].filter((line): line is string => Boolean(line) || line === "");

  return lines.join("\n");
}

export async function sendContactNotification(
  input: ContactNotificationInput,
): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL
    ? process.env.CONTACT_TO_EMAIL.split(",")
        .map((address) => address.trim())
        .filter(Boolean)
    : DEFAULT_RECIPIENTS;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "no-reply@gooddevtech.com";
  const fromName = process.env.CONTACT_FROM_NAME ?? "GoodDev Technology";

  const response = await fetch(BREVO_SEND_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "api-key": getApiKey(),
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: to.map((email) => ({ email })),
      replyTo: { email: input.email, name: input.name },
      subject: `New project inquiry from ${input.name}`,
      htmlContent: buildHtml(input),
      textContent: buildText(input),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Brevo send failed (${response.status}): ${body || response.statusText}`,
    );
  }
}
