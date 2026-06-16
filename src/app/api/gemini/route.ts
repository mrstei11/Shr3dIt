import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = String(body.prompt ?? "").trim();

    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const text = await askGemini(prompt);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("POST /api/gemini", error);
    return NextResponse.json(
      { error: "Gemini request failed" },
      { status: 500 }
    );
  }
}
