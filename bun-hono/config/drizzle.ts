import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
