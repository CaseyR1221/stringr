"use server";

import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { racquetSchema, type RacquetInput } from "@/lib/validations";

type RacquetFieldErrors = Partial<Record<keyof RacquetInput, string>>;

export type RacquetFormActionState = {
  fieldErrors?: RacquetFieldErrors;
  formError?: string;
};

async function getCurrentUserId() {
  const user = await requireCurrentUser();
  return user.id;
}

function getFlattenedFieldErrors(input: unknown): RacquetFormActionState | null {
  const parsedInput = racquetSchema.safeParse(input);

  if (parsedInput.success) {
    return null;
  }

  const flattenedErrors = parsedInput.error.flatten().fieldErrors;

  return {
    fieldErrors: {
      brand: flattenedErrors.brand?.[0],
      model: flattenedErrors.model?.[0],
      nickname: flattenedErrors.nickname?.[0],
      headSize: flattenedErrors.headSize?.[0],
      stringPattern: flattenedErrors.stringPattern?.[0],
      weightGrams: flattenedErrors.weightGrams?.[0],
      imageUrl: flattenedErrors.imageUrl?.[0],
      notes: flattenedErrors.notes?.[0],
    },
  };
}

export async function createRacquetAction(input: RacquetInput): Promise<RacquetFormActionState | void> {
  const userId = await getCurrentUserId();
  const validationState = getFlattenedFieldErrors(input);

  if (validationState) {
    return validationState;
  }

  const racquet = racquetSchema.parse(input);

  await prisma.racquet.create({
    data: {
      ...racquet,
      userId,
    },
  });

  redirect("/dashboard/racquets");
}

export async function updateRacquetAction(
  racquetId: string,
  input: RacquetInput,
): Promise<RacquetFormActionState | void> {
  const userId = await getCurrentUserId();
  const validationState = getFlattenedFieldErrors(input);

  if (validationState) {
    return validationState;
  }

  const racquet = racquetSchema.parse(input);
  const result = await prisma.racquet.updateMany({
    where: {
      id: racquetId,
      userId,
    },
    data: racquet,
  });

  if (result.count === 0) {
    return {
      formError: "Racquet not found.",
    };
  }

  redirect(`/dashboard/racquets/${racquetId}`);
}

export async function deleteRacquetAction(racquetId: string) {
  const userId = await getCurrentUserId();

  await prisma.racquet.deleteMany({
    where: {
      id: racquetId,
      userId,
    },
  });

  redirect("/dashboard/racquets");
}
