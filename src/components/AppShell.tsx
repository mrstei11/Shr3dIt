"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

      <header className="fixed top-0 left-0 right-0 z-20 flex h-14 items-center justify-between border-b-2 border-[#39ff14] bg-black px-4 safe-top lg:hidden">
        <span className="text-[#39ff14] text-lg font-bold tracking-wider drop-shadow-[0_0_10px_#39ff14]">
          SHR3D_IT
        </span>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="timer-btn !m-0 min-h-11 min-w-11 px-3 text-lg leading-none"
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

      <main className="main-content flex-1 min-w-0 w-full">{children}</main>
    </div>
  );
}
