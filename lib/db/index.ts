import { Pool } from "pg";

/**
 * PLACEHOLDER — DATABASE_URL is not set to a real database yet. This client
 * is fully wired (schema in lib/db/schema.sql, applied via `npm run
 * db:migrate`) and will work as soon as a real Postgres connection string
 * (e.g. from Neon or Vercel Postgres) is set in the environment.
 */
let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
      );
    }
    pool = new Pool({
      connectionString,
      // Hosted Postgres (Neon, Vercel Postgres, etc.) terminates TLS with a
      // cert most Node trust stores won't validate by default; this is the
      // standard pragmatic setting for that case, not a general bypass.
      ssl: connectionString.includes("sslmode=disable")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export type ContactSubmissionInput = {
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  ip: string;
  userAgent: string;
};

export async function insertSubmission(
  input: ContactSubmissionInput,
): Promise<number> {
  const { rows } = await getPool().query<{ id: number }>(
    `INSERT INTO contact_submissions
       (name, email, company, service, budget, message, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`,
    [
      input.name,
      input.email,
      input.company,
      input.service,
      input.budget,
      input.message,
      input.ip,
      input.userAgent,
    ],
  );
  return rows[0].id;
}

export async function markEmailSent(submissionId: number): Promise<void> {
  await getPool().query(
    `UPDATE contact_submissions SET email_sent = true WHERE id = $1`,
    [submissionId],
  );
}

export async function markEmailError(
  submissionId: number,
  error: string,
): Promise<void> {
  await getPool().query(
    `UPDATE contact_submissions SET email_error = $2 WHERE id = $1`,
    [submissionId, error],
  );
}

export async function countRecentSubmissionsByIp(
  ip: string,
  windowMinutes: number,
): Promise<number> {
  const { rows } = await getPool().query<{ count: number }>(
    `SELECT count(*)::int AS count FROM contact_submissions
     WHERE ip = $1 AND created_at > now() - ($2 || ' minutes')::interval`,
    [ip, windowMinutes],
  );
  return rows[0].count;
}

export type StoredSubmission = {
  id: number;
  created_at: Date;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  email_sent: boolean;
  email_error: string | null;
};

export async function listRecentSubmissions(
  limit = 100,
): Promise<StoredSubmission[]> {
  const { rows } = await getPool().query<StoredSubmission>(
    `SELECT id, created_at, name, email, company, service, budget, message,
            email_sent, email_error
     FROM contact_submissions
     ORDER BY created_at DESC
     LIMIT $1`,
    [limit],
  );
  return rows;
}
