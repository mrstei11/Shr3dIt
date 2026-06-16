"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/strength", label: "> STRENGTH", icon: "♥" },
  { href: "/loadout", label: "> THE LOADOUT", icon: "◎" },
  { href: "/archive", label: "> INTEL_ARCHIVE", icon: "▣" },
  { href: "/mind", label: "> MIND", icon: "◈" },
  { href: "/spirit", label: "> SPIRIT", icon: "✦" },
  { href: "/nutrition", label: "> FUEL", icon: "▮" },
] as const;

export function Sidebar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-[#333] bg-black min-h-screen p-4">
      <div className="mb-6 border-b-2 border-[#39ff14] pb-3">
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
              className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                active
                  ? "text-[#39ff14] bg-[#111] border-l-2 border-[#39ff14]"
                  : "text-[#39ff14]/80 hover:text-[#39ff14] hover:bg-[#111]"
              }`}
            >
              <span aria-hidden>{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      {children && <div className="mt-6 space-y-3">{children}</div>}
    </aside>
  );
}
