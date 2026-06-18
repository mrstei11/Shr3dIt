"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/strength";
  const registered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = callbackUrl;
  }

  return (
    <div className="box w-full max-w-md">
      <div className="box-header">OPERATOR LOGIN</div>
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
        {registered && (
          <p className="text-sm text-[#39ff14]">
            Account created. Sign in to access your intel log.
          </p>
        )}
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
          <label className="block text-xs text-[#39ff14]/70 mb-1">PASSWORD</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="timer-btn w-full !m-0"
        >
          {loading ? "AUTHENTICATING..." : "INITIATE SESSION"}
        </button>
        <p className="text-sm text-[#888] text-center">
          No account?{" "}
          <Link href="/register" className="text-[#39ff14] hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
