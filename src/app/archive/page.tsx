import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ArchivePage } from "@/components/ArchivePage";

export default async function ArchiveRoute() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/archive");
  }

  return <ArchivePage />;
}
