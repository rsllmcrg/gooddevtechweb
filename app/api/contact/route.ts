import { NextResponse } from "next/server";
import {
  countRecentSubmissionsByIp,
  insertSubmission,
  listRecentSubmissions,
  markEmailError,
  markEmailSent,
} from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_SUBMISSIONS = 5;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

/**
 * PLACEHOLDER credentials — RESEND_API_KEY and DATABASE_URL aren't real
 * yet (see lib/email.ts, lib/db/index.ts, and .env.example), so email
 * delivery and persistence will throw until they're set. Honeypot and
 * rate-limit checks below don't depend on either and are fully live.
 *
 * Submission order matters: persist first, then attempt the notification
 * email. A bounced/failed email is logged and recorded against the row
 * (email_sent / email_error) but never costs the submission itself —
 * that's the whole point of storing it before emailing it.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const ip = getClientIp(request);

  // Honeypot: a hidden field real visitors never see or fill (see
  // ContactForm.tsx). A bot that fills every field will fill this too.
  // Reject with a plain 200 — same shape as success — so it doesn't learn
  // to look for a different signal, without touching the DB or email.
  if (typeof body?.website === "string" && body.website.trim() !== "") {
    console.warn("[contact] blocked: honeypot filled", { ip });
    return NextResponse.json({ ok: true });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const company =
    typeof body?.company === "string" && body.company.trim()
      ? body.company.trim()
      : null;
  const service =
    typeof body?.service === "string" && body.service.trim()
      ? body.service.trim()
      : null;
  const budget =
    typeof body?.budget === "string" && body.budget.trim()
      ? body.budget.trim()
      : null;

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 },
    );
  }

  const userAgent = request.headers.get("user-agent") ?? "unknown";

  try {
    const recentCount = await countRecentSubmissionsByIp(
      ip,
      RATE_LIMIT_WINDOW_MINUTES,
    );
    if (recentCount >= RATE_LIMIT_MAX_SUBMISSIONS) {
      console.warn("[contact] blocked: rate limit exceeded", { ip });
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }
  } catch (error) {
    // Fail open: if the rate-limit check itself is broken (e.g. DB not
    // configured yet), we'd rather risk a duplicate than silently drop a
    // real inquiry because of an infra problem unrelated to spam.
    console.error("[contact] rate-limit check failed", error);
  }

  let submissionId: number;
  try {
    submissionId = await insertSubmission({
      name,
      email,
      company,
      service,
      budget,
      message,
      ip,
      userAgent,
    });
  } catch (error) {
    console.error("[contact] failed to persist submission", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your message." },
      { status: 500 },
    );
  }

  try {
    await sendContactNotification({
      name,
      email,
      company,
      service,
      budget,
      message,
    });
    await markEmailSent(submissionId);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[contact] failed to send notification email", {
      submissionId,
      error: errorMessage,
    });
    await markEmailError(submissionId, errorMessage).catch((updateError) => {
      console.error("[contact] failed to record email error", updateError);
    });
  }

  return NextResponse.json({ ok: true });
}

/**
 * Retrieval for stored submissions — this is what makes them recoverable
 * when a notification email bounces. Protected by a shared bearer token
 * (ADMIN_API_TOKEN); there's no admin UI yet, so this is meant to be
 * queried directly, e.g.:
 *
 *   curl -H "Authorization: Bearer $ADMIN_API_TOKEN" \
 *     https://<site>/api/contact
 */
export async function GET(request: Request) {
  const expected = process.env.ADMIN_API_TOKEN;
  const authHeader = request.headers.get("authorization");

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const submissions = await listRecentSubmissions();
    return NextResponse.json({ ok: true, submissions });
  } catch (error) {
    console.error("[contact] failed to retrieve submissions", error);
    return NextResponse.json(
      { ok: false, error: "Could not retrieve submissions." },
      { status: 500 },
    );
  }
}
