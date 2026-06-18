"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function AuthStatus({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="text-xs text-[#39ff14]/50 animate-pulse">
        AUTH CHECK...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="space-y-2">
        <p className="text-xs text-[#888]">Sign in to save your intel log.</p>
        <Link
          href="/login"
          onClick={onNavigate}
          className="timer-btn block w-full text-center !m-0 text-sm"
        >
          OPERATOR LOGIN
        </Link>
        <Link
          href="/register"
          onClick={onNavigate}
          className="block w-full text-center text-sm text-[#39ff14]/80 hover:text-[#39ff14] py-2"
        >
          CREATE ACCOUNT
        </Link>
      </div>
    );
  }

  const email = session.user.email ?? "OPERATOR";

  return (
    <div className="space-y-2">
      <p className="text-xs text-[#39ff14]/70 break-all">LOGGED IN: {email}</p>
      <button
        type="button"
        className="timer-btn w-full !m-0 text-sm"
        onClick={() => {
          onNavigate?.();
          signOut({ callbackUrl: "/strength" });
        }}
      >
        DISCONNECT
      </button>
    </div>
  );
}
