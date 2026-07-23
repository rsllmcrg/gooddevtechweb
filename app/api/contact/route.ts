import { NextResponse } from "next/server";

/**
 * PLACEHOLDER — validates and accepts a contact-form submission but doesn't
 * send it anywhere yet (no email/CRM service is configured). Logs
 * server-side and returns success so the form's success/failure UI states
 * are real and testable end to end. Wire up real delivery (e.g. Resend, a
 * CRM webhook) before launch.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  console.log("[contact form submission]", body);

  return NextResponse.json({ ok: true });
}
