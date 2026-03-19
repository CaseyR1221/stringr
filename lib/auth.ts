import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is required to initialize Better Auth.");
}

export const auth = betterAuth({
  baseURL: baseUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    dash()
  ],
  emailAndPassword: {
    enabled: true,
  },
  secret: authSecret,
  trustedOrigins: [baseUrl],
});
