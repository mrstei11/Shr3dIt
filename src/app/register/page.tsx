import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/RegisterForm";

export default async function RegisterPage() {
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
      <RegisterForm />
    </div>
  );
}
