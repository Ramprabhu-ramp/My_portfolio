import { PrismaClient } from "@prisma/client";

// Standard Next.js pattern: reuse one PrismaClient across hot reloads in
// dev, so each file save doesn't open a new DB connection.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
