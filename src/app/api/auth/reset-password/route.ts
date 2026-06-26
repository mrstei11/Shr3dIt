import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/password-reset";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body.token ?? "").trim();
    const password = String(body.password ?? "");

    if (!token) {
      return NextResponse.json(
        { error: "Reset token is missing." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const ok = await resetPasswordWithToken(token, password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Request a new one." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Password updated. You can sign in now.",
    });
  } catch (error) {
    console.error("POST /api/auth/reset-password", error);
    return NextResponse.json(
      { error: "Reset failed." },
      { status: 500 }
    );
  }
}
