import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
    // @ts-expect-error -- directUrl is supported at runtime but missing from Prisma's type definitions
    directUrl: process.env["DIRECT_URL"],
  },
});
