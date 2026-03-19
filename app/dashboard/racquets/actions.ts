"use server";

import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { racquetSchema, stringJobSchema, type RacquetInput, type StringJobInput } from "@/lib/validations";

type RacquetFieldErrors = Partial<Record<keyof RacquetInput, string>>;
type StringJobFieldErrors = Partial<Record<keyof StringJobInput, string>>;

export type RacquetFormActionState = {
  fieldErrors?: RacquetFieldErrors;
  formError?: string;
};

export type StringJobFormActionState = {
  fieldErrors?: StringJobFieldErrors;
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

function getFlattenedStringJobFieldErrors(input: unknown): StringJobFormActionState | null {
  const parsedInput = stringJobSchema.safeParse(input);

  if (parsedInput.success) {
    return null;
  }

  const flattenedErrors = parsedInput.error.flatten().fieldErrors;

  return {
    fieldErrors: {
      mainString: flattenedErrors.mainString?.[0],
      crossString: flattenedErrors.crossString?.[0],
      tensionMainLbs: flattenedErrors.tensionMainLbs?.[0],
      tensionCrossLbs: flattenedErrors.tensionCrossLbs?.[0],
      gauge: flattenedErrors.gauge?.[0],
      stringType: flattenedErrors.stringType?.[0],
      strungAt: flattenedErrors.strungAt?.[0],
      notes: flattenedErrors.notes?.[0],
    },
  };
}

function getStringJobData(input: StringJobInput) {
  return {
    mainString: input.mainString,
    crossString: input.crossString,
    tensionMainLbs: input.tensionMainLbs,
    tensionCrossLbs: input.tensionCrossLbs,
    gauge: input.gauge,
    stringType: input.stringType ?? "",
    strungAt: input.strungAt,
    notes: input.notes,
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

export async function createStringJobAction(
  racquetId: string,
  input: StringJobInput,
): Promise<StringJobFormActionState | void> {
  const userId = await getCurrentUserId();
  const validationState = getFlattenedStringJobFieldErrors(input);

  if (validationState) {
    return validationState;
  }

  const racquet = await prisma.racquet.findFirst({
    where: {
      id: racquetId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!racquet) {
    return {
      formError: "Racquet not found.",
    };
  }

  const stringJob = stringJobSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    await tx.stringJob.updateMany({
      where: {
        racquetId,
      },
      data: {
        isCurrent: false,
      },
    });

    await tx.stringJob.create({
      data: {
        ...getStringJobData(stringJob),
        racquetId,
        isCurrent: true,
      },
    });
  });

  redirect(`/dashboard/racquets/${racquetId}`);
}

export async function updateStringJobAction(
  racquetId: string,
  stringJobId: string,
  input: StringJobInput,
): Promise<StringJobFormActionState | void> {
  const userId = await getCurrentUserId();
  const validationState = getFlattenedStringJobFieldErrors(input);

  if (validationState) {
    return validationState;
  }

  const existingStringJob = await prisma.stringJob.findFirst({
    where: {
      id: stringJobId,
      racquetId,
      racquet: {
        userId,
      },
    },
    select: {
      id: true,
      isCurrent: true,
    },
  });

  if (!existingStringJob) {
    return {
      formError: "String job not found.",
    };
  }

  const stringJob = stringJobSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    if (existingStringJob.isCurrent) {
      await tx.stringJob.updateMany({
        where: {
          racquetId,
          id: {
            not: stringJobId,
          },
        },
        data: {
          isCurrent: false,
        },
      });
    }

    await tx.stringJob.update({
      where: {
        id: stringJobId,
      },
      data: {
        ...getStringJobData(stringJob),
        isCurrent: existingStringJob.isCurrent,
      },
    });
  });

  redirect(`/dashboard/racquets/${racquetId}`);
}
