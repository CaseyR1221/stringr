import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const authSecret = process.env.BETTER_AUTH_SECRET ?? "local-development-secret-change-me";

export const auth = betterAuth({
  baseURL: baseUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: authSecret,
  trustedOrigins: [baseUrl],
});
