"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="box w-full max-w-md p-4 sm:p-6 text-center space-y-4">
        <p className="text-red-400 text-sm">Invalid reset link.</p>
        <Link href="/forgot-password" className="timer-btn inline-block !m-0">
          REQUEST NEW LINK
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Reset failed.");
        return;
      }

      setMessage(data.message);
    } catch {
      setError("Reset failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="box w-full max-w-md">
      <div className="box-header">SET NEW PASSWORD</div>
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        {message ? (
          <>
            <p className="text-sm text-[#39ff14]">{message}</p>
            <Link href="/login" className="timer-btn block w-full !m-0 text-center">
              GO TO LOGIN
            </Link>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs text-[#39ff14]/70 mb-1">
                NEW PASSWORD (8+ chars)
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[#39ff14]/70 mb-1">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-2.5 text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="timer-btn w-full !m-0"
            >
              {loading ? "UPDATING..." : "UPDATE PASSWORD"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
