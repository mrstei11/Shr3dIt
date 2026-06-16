import { neon } from "@neondatabase/serverless";

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
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      week INTEGER NOT NULL,
      day TEXT NOT NULL,
      note TEXT NOT NULL
    )
  `;
}

export async function getNotes(): Promise<WorkoutNote[]> {
  const sql = getSql();
  await ensureNotesTable();
  const rows = await sql`
    SELECT id, timestamp::text, week, day, note
    FROM notes
    ORDER BY id DESC
  `;
  return rows as WorkoutNote[];
}

export async function createNote(
  week: number,
  day: string,
  note: string
): Promise<WorkoutNote> {
  const sql = getSql();
  await ensureNotesTable();
  const rows = await sql`
    INSERT INTO notes (week, day, note)
    VALUES (${week}, ${day}, ${note})
    RETURNING id, timestamp::text, week, day, note
  `;
  return rows[0] as WorkoutNote;
}
