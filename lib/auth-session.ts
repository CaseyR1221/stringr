import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export async function getCurrentUserSession() {
  return auth.api.getSession({
    headers: new Headers(await headers()),
  });
}

export async function requireCurrentUser() {
  const session = await getCurrentUserSession();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session.user;
}
