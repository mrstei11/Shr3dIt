"use client";

import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Request failed.");
        return;
      }

      setMessage(data.message);
    } catch {
      setError("Request failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="box w-full max-w-md">
      <div className="box-header">PASSWORD RECOVERY</div>
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        <p className="text-sm text-[#888]">
          Enter your email. We&apos;ll send a reset link if an account exists.
        </p>
        <div>
          <label className="block text-xs text-[#39ff14]/70 mb-1">EMAIL</label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 text-sm"
          />
        </div>
        {message && <p className="text-sm text-[#39ff14]">{message}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="timer-btn w-full !m-0"
        >
          {loading ? "TRANSMITTING..." : "SEND RESET LINK"}
        </button>
        <p className="text-sm text-[#888] text-center">
          <Link href="/login" className="text-[#39ff14] hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
