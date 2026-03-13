import { makeSignature } from "better-auth/crypto";

export const SESSION_COOKIE_NAME = "better-auth.session_token";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is required to create session cookies.");
}

function getAuthSecret() {
  if (!authSecret) {
    throw new Error("BETTER_AUTH_SECRET is required to create session cookies.");
  }

  return authSecret;
}

export async function createSignedSessionCookieValue(sessionToken: string) {
  const signature = await makeSignature(sessionToken, getAuthSecret());
  return `${sessionToken}.${signature}`;
}
