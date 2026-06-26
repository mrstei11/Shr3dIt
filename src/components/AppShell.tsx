"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { OperatorBadge } from "./AuthStatus";
import { Sidebar } from "./Sidebar";

export function AppShell({
  children,
  sidebarExtra,
}: {
  children: React.ReactNode;
  sidebarExtra?: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen min-h-dvh">
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/75 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center gap-2 border-b-2 border-[#39ff14] bg-black px-3 safe-top lg:hidden">
        <span className="text-[#39ff14] text-lg font-bold tracking-wider drop-shadow-[0_0_10px_#39ff14] shrink-0">
          SHR3D_IT
        </span>
        <div className="flex-1 flex justify-center min-w-0">
          <OperatorBadge compact />
        </div>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="timer-btn !m-0 min-h-11 min-w-11 px-3 text-lg leading-none shrink-0"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      <Sidebar
        menuOpen={menuOpen}
        onNavigate={() => setMenuOpen(false)}
        sidebarExtra={sidebarExtra}
      />

      <div className="flex flex-1 min-w-0 flex-col">
        <div className="hidden lg:flex items-center justify-between border-b border-[#333] bg-[#0a0a0a] px-6 py-2">
          <span className="text-xs uppercase tracking-widest text-[#39ff14]/60">
            Operator Console
          </span>
          <OperatorBadge />
        </div>
        <main className="main-content flex-1 min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
