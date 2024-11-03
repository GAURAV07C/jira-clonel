import { PrismaClient } from '@prisma/client';

declare global {
  // Prevents TypeScript from complaining about the `prisma` property on `globalThis`
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client as a singleton
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
