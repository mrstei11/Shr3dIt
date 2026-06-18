"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed.");
        setLoading(false);
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        window.location.href = "/login?registered=1";
        return;
      }

      window.location.href = "/strength";
    } catch {
      setError("Registration failed. Check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="box w-full max-w-md">
      <div className="box-header">CREATE OPERATOR ID</div>
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
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
        <div>
          <label className="block text-xs text-[#39ff14]/70 mb-1">
            PASSWORD (8+ chars)
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
          {loading ? "CREATING..." : "REGISTER OPERATOR"}
        </button>
        <p className="text-sm text-[#888] text-center">
          Already registered?{" "}
          <Link href="/login" className="text-[#39ff14] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
