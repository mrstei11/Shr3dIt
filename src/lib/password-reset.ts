import { createHash, randomBytes } from "crypto";
import { neon } from "@neondatabase/serverless";
import { hash } from "bcryptjs";
import { ensureUsersTable, getUserByEmail } from "@/lib/users";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured");
  }
  return neon(url);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function ensurePasswordResetTable() {
  const sql = getSql();
  await ensureUsersTable();
  await sql`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function createPasswordResetToken(
  email: string
): Promise<{ token: string; email: string } | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const sql = getSql();
  await ensurePasswordResetTable();

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  await sql`DELETE FROM password_reset_tokens WHERE user_id = ${user.id}`;
  await sql`
    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
    VALUES (${user.id}, ${tokenHash}, ${expiresAt})
  `;

  return { token, email: user.email };
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string
): Promise<boolean> {
  const sql = getSql();
  await ensurePasswordResetTable();

  const tokenHash = hashToken(token);
  const rows = await sql`
    SELECT user_id, expires_at
    FROM password_reset_tokens
    WHERE token_hash = ${tokenHash}
    LIMIT 1
  `;

  const record = rows[0] as
    | { user_id: number; expires_at: string }
    | undefined;

  if (!record) return false;
  if (new Date(record.expires_at) < new Date()) {
    await sql`DELETE FROM password_reset_tokens WHERE token_hash = ${tokenHash}`;
    return false;
  }

  const password_hash = await hash(newPassword, 12);
  await sql`
    UPDATE users SET password_hash = ${password_hash} WHERE id = ${record.user_id}
  `;
  await sql`DELETE FROM password_reset_tokens WHERE user_id = ${record.user_id}`;

  return true;
}
