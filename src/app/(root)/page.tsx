import { redirect } from "next/navigation";

export default async function Page() {
  redirect("/venue");
}

export const dynamic = "force-dynamic";
