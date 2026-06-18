"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthStatus } from "./AuthStatus";

const NAV = [
  { href: "/strength", label: "> STRENGTH", short: "STR", icon: "♥" },
  { href: "/loadout", label: "> THE LOADOUT", short: "LOAD", icon: "◎" },
  { href: "/archive", label: "> INTEL_ARCHIVE", short: "LOG", icon: "▣" },
  { href: "/mind", label: "> MIND", short: "MIND", icon: "◈" },
  { href: "/spirit", label: "> SPIRIT", short: "SPIRIT", icon: "✦" },
  { href: "/nutrition", label: "> FUEL", short: "FUEL", icon: "▮" },
] as const;

export function Sidebar({
  menuOpen = false,
  onNavigate,
  sidebarExtra,
}: {
  menuOpen?: boolean;
  onNavigate?: () => void;
  sidebarExtra?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex min-h-dvh w-[min(100vw-2.5rem,17rem)] flex-col border-r border-[#333] bg-black p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-24 lg:pb-4 transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:min-h-screen",
          menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="mb-6 hidden border-b-2 border-[#39ff14] pb-3 lg:block">
          <h1 className="text-[#39ff14] text-xl font-bold tracking-wider drop-shadow-[0_0_10px_#39ff14]">
            SHR3D_IT
          </h1>
        </div>
        <nav className="space-y-1">
          {NAV.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                className={`flex min-h-11 items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "text-[#39ff14] bg-[#111] border-l-2 border-[#39ff14]"
                    : "text-[#39ff14]/80 hover:text-[#39ff14] hover:bg-[#111]"
                }`}
              >
                <span aria-hidden className="text-base">
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
        {sidebarExtra && (
          <div className="mt-6 space-y-3 border-t border-[#333] pt-4">
            {sidebarExtra}
          </div>
        )}
        <div className="mt-auto border-t border-[#333] pt-4">
          <AuthStatus onNavigate={onNavigate} />
        </div>
      </aside>

      <nav
        aria-label="Primary"
        className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-6 border-t border-[#333] bg-black safe-bottom lg:hidden"
      >
        {NAV.map(({ href, short, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-0.5 py-1 text-[10px] leading-tight ${
                active ? "text-[#39ff14] bg-[#111]" : "text-[#39ff14]/70"
              }`}
            >
              <span aria-hidden className="text-sm">
                {icon}
              </span>
              <span>{short}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
