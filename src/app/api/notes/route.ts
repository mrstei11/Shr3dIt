import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createNote, getNotes } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const notes = await getNotes(Number(session.user.id));
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("GET /api/notes", error);
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const week = Number(body.week);
    const day = String(body.day ?? "");
    const note = String(body.note ?? "").trim();

    if (!week || !day || !note) {
      return NextResponse.json(
        { error: "week, day, and note are required" },
        { status: 400 }
      );
    }

    const saved = await createNote(Number(session.user.id), week, day, note);
    return NextResponse.json({ note: saved });
  } catch (error) {
    console.error("POST /api/notes", error);
    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 503 }
    );
  }
}
