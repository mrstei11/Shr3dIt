import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6 safe-top safe-bottom text-center">
      <div className="w-full max-w-lg space-y-8">
        <div>
          <h1 className="text-[#39ff14] text-4xl sm:text-5xl font-bold tracking-wider drop-shadow-[0_0_12px_#39ff14]">
            SHR3D_IT
          </h1>
          <p className="mt-4 text-[#888] text-sm sm:text-base leading-relaxed">
            Tactical fitness system. 12-week progressive programming, intel
            logging, and operator tools — private to your account.
          </p>
        </div>

        <div className="box text-left">
          <div className="box-header">MISSION BRIEF</div>
          <ul className="p-4 sm:p-5 space-y-2 text-sm sm:text-base text-[#ccc]">
            <li>♥ 12-week strength &amp; conditioning program</li>
            <li>▣ Private workout intel archive</li>
            <li>◎ Custom exercise loadout builder</li>
            <li>◈ Mind &amp; Spirit uplinks</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="timer-btn !m-0 text-center py-3">
            OPERATOR LOGIN
          </Link>
          <Link
            href="/register"
            className="timer-btn !m-0 text-center py-3 border-[#888] text-[#ccc] hover:border-[#39ff14] hover:text-[#39ff14]"
          >
            CREATE ACCOUNT
          </Link>
        </div>

        <p className="text-xs text-[#555]">
          Email &amp; password only. Your data stays on your account.
        </p>
      </div>
    </div>
  );
}
