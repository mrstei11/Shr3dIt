import { neon } from "@neondatabase/serverless";
import { ensureUsersTable } from "@/lib/users";

export interface WorkoutNote {
  id: number;
  timestamp: string;
  week: number;
  day: string;
  note: string;
}

function getSql() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured");
  }
  return neon(url);
}

export async function ensureNotesTable() {
  const sql = getSql();
  await ensureUsersTable();
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      week INTEGER NOT NULL,
      day TEXT NOT NULL,
      note TEXT NOT NULL
    )
  `;
  await sql`
    ALTER TABLE notes ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  `;
}

export async function getNotes(userId: number): Promise<WorkoutNote[]> {
  const sql = getSql();
  await ensureNotesTable();
  const rows = await sql`
    SELECT id, timestamp::text, week, day, note
    FROM notes
    WHERE user_id = ${userId}
    ORDER BY id DESC
  `;
  return rows as WorkoutNote[];
}

export async function createNote(
  userId: number,
  week: number,
  day: string,
  note: string
): Promise<WorkoutNote> {
  const sql = getSql();
  await ensureNotesTable();
  const rows = await sql`
    INSERT INTO notes (user_id, week, day, note)
    VALUES (${userId}, ${week}, ${day}, ${note})
    RETURNING id, timestamp::text, week, day, note
  `;
  return rows[0] as WorkoutNote;
}
