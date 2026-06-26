import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/strength");

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 safe-top safe-bottom">
      <Link
        href="/"
        className="mb-8 text-[#39ff14] text-xl font-bold tracking-wider drop-shadow-[0_0_10px_#39ff14]"
      >
        SHR3D_IT
      </Link>
      <Suspense fallback={<p className="text-[#888]">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
