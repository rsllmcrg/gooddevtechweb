// Applies lib/db/schema.sql against DATABASE_URL. Run via `npm run
// db:migrate` (which loads .env.local through Node's --env-file flag).
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=disable")
    ? undefined
    : { rejectUnauthorized: false },
});

const sql = readFileSync(
  path.join(__dirname, "..", "lib", "db", "schema.sql"),
  "utf8",
);

try {
  await pool.query(sql);
  console.log("Migration applied.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
