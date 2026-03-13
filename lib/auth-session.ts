import { timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { makeSignature } from "better-auth/crypto";

import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME } from "@/lib/session-cookie";

const SESSION_COOKIE_NAMES = [SESSION_COOKIE_NAME, "__Secure-better-auth.session_token"] as const;

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is required to read the current session.");
}

function isValidSignature(expectedSignature: string, receivedSignature: string) {
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

function getAuthSecret() {
  if (!authSecret) {
    throw new Error("BETTER_AUTH_SECRET is required to read the current session.");
  }

  return authSecret;
}

async function getSignedSessionToken() {
  const cookieStore = await cookies();

  for (const cookieName of SESSION_COOKIE_NAMES) {
    const cookieValue = cookieStore.get(cookieName)?.value;

    if (cookieValue) {
      return cookieValue;
    }
  }

  return null;
}

async function getVerifiedSessionToken() {
  const signedToken = await getSignedSessionToken();

  if (!signedToken) {
    return null;
  }

  const separatorIndex = signedToken.lastIndexOf(".");

  if (separatorIndex <= 0) {
    return null;
  }

  const sessionToken = signedToken.slice(0, separatorIndex);
  const receivedSignature = signedToken.slice(separatorIndex + 1);
  const expectedSignature = await makeSignature(sessionToken, getAuthSecret());

  if (!isValidSignature(expectedSignature, receivedSignature)) {
    return null;
  }

  return sessionToken;
}

export async function getCurrentUserSession() {
  const sessionToken = await getVerifiedSessionToken();

  if (!sessionToken) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    return null;
  }

  return session;
}

export async function requireCurrentUser() {
  const session = await getCurrentUserSession();

  if (!session?.user.id) {
    redirect("/sign-in");
  }

  return session.user;
}
