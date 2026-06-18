import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 safe-top safe-bottom">
      <Link
        href="/strength"
        className="mb-8 text-[#39ff14] text-xl font-bold tracking-wider drop-shadow-[0_0_10px_#39ff14]"
      >
        SHR3D_IT
      </Link>
      <RegisterForm />
    </div>
  );
}
