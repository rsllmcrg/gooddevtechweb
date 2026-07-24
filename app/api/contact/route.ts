import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

/**
 * In-memory rate limit — resets on every server restart/deploy and isn't
 * shared across serverless instances. Good enough as a basic spam brake
 * without a database; swap for a DB or Redis-backed limiter if this needs
 * to hold up across instances.
 */
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_SUBMISSIONS;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const ip = getClientIp(request);

  // Honeypot: a hidden field real visitors never see or fill (see
  // ContactForm.tsx). A bot that fills every field will fill this too.
  // Reject with a plain 200 — same shape as success — so it doesn't learn
  // to look for a different signal.
  if (typeof body?.website === "string" && body.website.trim() !== "") {
    console.warn("[contact] blocked: honeypot filled", { ip });
    return NextResponse.json({ ok: true });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const service =
    typeof body?.service === "string" ? body.service.trim() : "";
  const company =
    typeof body?.company === "string" && body.company.trim()
      ? body.company.trim()
      : null;
  const budget =
    typeof body?.budget === "string" && body.budget.trim()
      ? body.budget.trim()
      : null;

  if (!name || !email || !phone || !service || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (isRateLimited(ip)) {
    console.warn("[contact] blocked: rate limit exceeded", { ip });
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  try {
    await sendContactNotification({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
    });
  } catch (error) {
    console.error("[contact] failed to send notification email", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
