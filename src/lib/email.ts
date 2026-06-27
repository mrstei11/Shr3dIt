/** Production URL for password reset emails — always use the stable alias. */
export function getPasswordResetBaseUrl(): string {
  const configured = process.env.APP_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configured) {
    if (configured.startsWith("http://") || configured.startsWith("https://")) {
      return configured.replace(/\/$/, "");
    }
    return `https://${configured.replace(/\/$/, "")}`;
  }
  return "https://shr3d-it.vercel.app";
}

export function buildPasswordResetUrl(token: string): string {
  return `${getPasswordResetBaseUrl()}/reset-password/${token}`;
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() || "SHR3D_IT <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return { ok: false, error: "Email service not configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: "SHR3D_IT — Reset your password",
      text: `Reset your SHR3D_IT password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore this email.`,
      html: `
        <div style="font-family: monospace; background:#050505; color:#e0e0e0; padding:24px;">
          <h1 style="color:#39ff14; margin:0 0 16px;">SHR3D_IT</h1>
          <p>Password reset requested for your operator account.</p>
          <p>Click below to set a new password. This link expires in 1 hour.</p>
          <p style="margin:24px 0;">
            <a href="${resetUrl}" style="display:inline-block; background:#000; color:#39ff14; border:1px solid #39ff14; padding:12px 20px; text-decoration:none;">
              RESET PASSWORD
            </a>
          </p>
          <p style="color:#888; font-size:12px;">Or copy this link into your browser:</p>
          <p style="color:#39ff14; font-size:12px; word-break:break-all;">${resetUrl}</p>
          <p style="color:#888; font-size:12px;">If you did not request this, ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend error:", response.status, body);

    if (response.status === 403 && body.includes("only send testing emails")) {
      return { ok: false, error: "Resend sandbox restriction" };
    }

    return { ok: false, error: "Failed to send email" };
  }

  return { ok: true };
}
