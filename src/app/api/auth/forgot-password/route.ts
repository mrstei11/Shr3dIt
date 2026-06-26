import { NextResponse } from "next/server";
import { getAppUrl, sendPasswordResetEmail } from "@/lib/email";
import { createPasswordResetToken } from "@/lib/password-reset";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").toLowerCase().trim();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await createPasswordResetToken(email);

    // Always return success to avoid revealing whether the email exists
    const message =
      "If an account exists for that email, a reset link has been sent.";

    if (!result) {
      return NextResponse.json({ message });
    }

    const resetUrl = `${getAppUrl()}/reset-password?token=${result.token}`;
    const sent = await sendPasswordResetEmail(result.email, resetUrl);

    if (!sent.ok) {
      return NextResponse.json(
        { error: "Could not send reset email. Try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("POST /api/auth/forgot-password", error);
    return NextResponse.json(
      { error: "Request failed." },
      { status: 500 }
    );
  }
}
