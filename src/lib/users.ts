import { neon } from "@neondatabase/serverless";
import { hash, compare } from "bcryptjs";

export interface User {
  id: number;
  email: string;
  password_hash: string;
}

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured");
  }
  return neon(url);
}

export async function ensureUsersTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const sql = getSql();
  await ensureUsersTable();
  const rows = await sql`
    SELECT id, email, password_hash
    FROM users
    WHERE email = ${email.toLowerCase()}
    LIMIT 1
  `;
  return (rows[0] as User | undefined) ?? null;
}

export async function createUser(
  email: string,
  password: string
): Promise<{ id: number; email: string }> {
  const sql = getSql();
  await ensureUsersTable();
  const normalized = email.toLowerCase().trim();
  const password_hash = await hash(password, 12);
  const rows = await sql`
    INSERT INTO users (email, password_hash)
    VALUES (${normalized}, ${password_hash})
    RETURNING id, email
  `;
  return rows[0] as { id: number; email: string };
}

export async function verifyPassword(
  user: User,
  password: string
): Promise<boolean> {
  return compare(password, user.password_hash);
}
