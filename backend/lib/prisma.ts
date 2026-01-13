import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

let prisma: PrismaClient;

if (!connectionString) {
  // If no DATABASE_URL, create a basic PrismaClient (for build time)
  prisma = global.prisma || new PrismaClient();
} else {
  // Create PostgreSQL adapter for runtime
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  prisma = global.prisma || new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
