import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to run the Prisma seed.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany({
    where: {
      email: "demo@stringr.app",
    },
  });

  await prisma.user.create({
    data: {
      id: "demo-user",
      name: "Avery Chen",
      email: "demo@stringr.app",
      emailVerified: true,
      racquets: {
        create: [
          {
            id: "demo-ezone-98",
            nickname: "Match Frame 1",
            brand: "Yonex",
            model: "EZONE 98",
            headSize: 98,
            stringPattern: "16x19",
            weightGrams: 305,
            imageUrl: "/demo/racquets/yonex-ezone-98.svg",
            notes: "Primary hard-court racquet with a slightly lower launch setup.",
            stringJobs: {
              create: [
                {
                  mainString: "Solinco Hyper-G",
                  crossString: "Solinco Hyper-G",
                  tensionMainLbs: 51,
                  tensionCrossLbs: 49,
                  gauge: "17",
                  stringType: "Poly",
                  strungAt: new Date("2026-02-10T14:00:00.000Z"),
                  notes: "Previous match setup before the latest restring.",
                  isCurrent: false,
                },
                {
                  mainString: "Luxilon ALU Power",
                  crossString: "Luxilon ALU Power",
                  tensionMainLbs: 50,
                  tensionCrossLbs: 48,
                  gauge: "16L",
                  stringType: "Poly",
                  strungAt: new Date("2026-03-02T15:30:00.000Z"),
                  notes: "Freshly restrung for weekend league play.",
                  isCurrent: true,
                },
              ],
            },
            playSessions: {
              create: [
                {
                  playedAt: new Date("2026-03-04T23:00:00.000Z"),
                  durationMinutes: 95,
                  notes: "Singles set plus serving basket.",
                },
                {
                  playedAt: new Date("2026-03-08T16:30:00.000Z"),
                  durationMinutes: 110,
                  notes: "USTA doubles match.",
                },
              ],
            },
          },
          {
            id: "demo-blade-98",
            nickname: "Practice Frame",
            brand: "Wilson",
            model: "Blade 98 16x19",
            headSize: 98,
            stringPattern: "16x19",
            weightGrams: 305,
            imageUrl: "/demo/racquets/wilson-blade-98.svg",
            notes: "Used for practice blocks and ball machine sessions.",
            stringJobs: {
              create: [
                {
                  mainString: "Tecnifibre X-One Biphase",
                  crossString: "Luxilon Element",
                  tensionMainLbs: 54,
                  tensionCrossLbs: 51,
                  gauge: "16",
                  stringType: "Hybrid",
                  strungAt: new Date("2026-02-26T19:00:00.000Z"),
                  notes: "Comfort-oriented hybrid for longer practice sessions.",
                  isCurrent: true,
                },
              ],
            },
            playSessions: {
              create: [
                {
                  playedAt: new Date("2026-02-28T17:00:00.000Z"),
                  durationMinutes: 75,
                  notes: "Crosscourt drilling session.",
                },
                {
                  playedAt: new Date("2026-03-06T22:00:00.000Z"),
                  durationMinutes: 120,
                  notes: "Ball machine reps and serve work.",
                },
              ],
            },
          },
          {
            id: "demo-speed-mp",
            nickname: "Clay Backup",
            brand: "Head",
            model: "Speed MP",
            headSize: 100,
            stringPattern: "16x19",
            weightGrams: 300,
            imageUrl: "/demo/racquets/head-speed-mp.svg",
            notes: "Backup frame with a controlled full-bed poly for heavier topspin days.",
            stringJobs: {
              create: [
                {
                  mainString: "Yonex Poly Tour Rev",
                  crossString: "Yonex Poly Tour Rev",
                  tensionMainLbs: 48,
                  tensionCrossLbs: 46,
                  gauge: "16L",
                  stringType: "Poly",
                  strungAt: new Date("2026-03-01T13:00:00.000Z"),
                  notes: "Lower tension for slower outdoor conditions.",
                  isCurrent: true,
                },
              ],
            },
            playSessions: {
              create: [
                {
                  playedAt: new Date("2026-03-03T21:00:00.000Z"),
                  durationMinutes: 85,
                  notes: "Heavy topspin baseline session.",
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
