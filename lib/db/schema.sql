-- Contact form submissions. Applied via `npm run db:migrate`.
-- Storage is deliberately separate from email delivery: a row lands here
-- before we ever try to send a notification, so a bounced/failed email
-- never means a lost inquiry.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT
);

-- Supports the rate-limit lookup (recent submissions from one IP).
CREATE INDEX IF NOT EXISTS contact_submissions_ip_created_at_idx
  ON contact_submissions (ip, created_at);
