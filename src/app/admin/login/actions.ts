"use server";

import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE } from "@/lib/session";

function passwordMatches(candidate: string, actual: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(actual);
  // Buffers must be equal length for timingSafeEqual; pad to a fixed size
  // first so a wrong-length guess doesn't short-circuit early.
  const maxLen = Math.max(a.length, b.length, 32);
  const aPadded = Buffer.concat([a], maxLen);
  const bPadded = Buffer.concat([b], maxLen);
  return timingSafeEqual(aPadded, bPadded) && a.length === b.length;
}

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD is not configured on the server." };
  }

  if (!password || !passwordMatches(password, adminPassword)) {
    return { error: "Incorrect password." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
