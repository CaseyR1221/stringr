import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { hashPassword, verifyPassword } from "better-auth/crypto";

import { prisma } from "@/lib/prisma";
import { createSignedSessionCookieValue, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/session-cookie";
import { signInSchema, signUpSchema } from "@/lib/validations";

type AuthRouteContext = {
  params: Promise<{
    all?: string[];
  }>;
};

function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
}

function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return null;
}

async function createSessionResponse(request: Request, user: { id: string; email: string; name: string; emailVerified: boolean; image: string | null }) {
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      token: createSessionToken(),
      expiresAt: getSessionExpiryDate(),
      ipAddress: getClientIp(request),
      userAgent: request.headers.get("user-agent"),
    },
  });

  const signedCookieValue = await createSignedSessionCookieValue(session.token);
  const response = NextResponse.json({
    redirect: false,
    token: session.token,
    url: null,
    user,
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: signedCookieValue,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: new URL(request.url).protocol === "https:",
  });

  return response;
}

export async function GET() {
  return NextResponse.json({ message: "Not found." }, { status: 404 });
}

export async function POST(request: Request, context: AuthRouteContext) {
  const { all = [] } = await context.params;
  const routePath = all.join("/");
  const requestBody = await request.json().catch(() => null);

  if (routePath === "sign-up/email") {
    const parsedBody = signUpSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      return NextResponse.json({ message: "Invalid sign-up submission." }, { status: 400 });
    }

    const email = parsedBody.data.email.toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 422 });
    }

    const passwordHash = await hashPassword(parsedBody.data.password);
    const user = await prisma.user.create({
      data: {
        name: parsedBody.data.name,
        email,
        emailVerified: false,
        accounts: {
          create: {
            accountId: crypto.randomUUID(),
            providerId: "credential",
            password: passwordHash,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
      },
    });

    return createSessionResponse(request, user);
  }

  if (routePath === "sign-in/email") {
    const parsedBody = signInSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      return NextResponse.json({ message: "Invalid sign-in submission." }, { status: 400 });
    }

    const email = parsedBody.data.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    const credentialAccount = user?.accounts.find((account) => account.providerId === "credential");

    if (!user || !credentialAccount?.password) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const passwordMatches = await verifyPassword({
      hash: credentialAccount.password,
      password: parsedBody.data.password,
    });

    if (!passwordMatches) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    return createSessionResponse(request, {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      image: user.image,
    });
  }

  return NextResponse.json({ message: "Not found." }, { status: 404 });
}
