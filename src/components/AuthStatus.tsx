"use client";

import { signOut, useSession } from "next-auth/react";

function emailLabel(email?: string | null) {
  if (!email) return "OPERATOR";
  const [name] = email.split("@");
  return name.toUpperCase();
}

export function OperatorBadge({ compact = false }: { compact?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-xs text-[#39ff14]/50 animate-pulse">...</span>
    );
  }

  if (!session?.user) return null;

  const email = session.user.email ?? "";
  const label = emailLabel(email);

  return (
    <div
      className="inline-flex items-center gap-2 rounded border border-[#39ff14]/40 bg-[#0a1a0a] px-2.5 py-1"
      title={email}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]"
        aria-hidden
      />
      <span className="text-[#39ff14] text-xs font-semibold tracking-wide">
        {compact ? label : `ONLINE: ${label}`}
      </span>
    </div>
  );
}

export function AuthStatus({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="text-xs text-[#39ff14]/50 animate-pulse">
        AUTH CHECK...
      </div>
    );
  }

  if (!session?.user) return null;

  const email = session.user.email ?? "OPERATOR";

  return (
    <div className="space-y-3">
      <div className="rounded border border-[#39ff14]/30 bg-[#0a1a0a] p-3">
        <p className="text-[10px] uppercase tracking-widest text-[#39ff14]/60 mb-1">
          Operator Status
        </p>
        <OperatorBadge />
        <p className="mt-2 text-xs text-[#888] break-all">{email}</p>
      </div>
      <button
        type="button"
        className="timer-btn w-full !m-0 text-sm"
        onClick={() => {
          onNavigate?.();
          signOut({ callbackUrl: "/" });
        }}
      >
        DISCONNECT
      </button>
    </div>
  );
}
