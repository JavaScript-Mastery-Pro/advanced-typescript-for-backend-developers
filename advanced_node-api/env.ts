import { z } from "zod";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  const error = result.error;
  console.error("❌ Invalid environment variables");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export const env: Readonly<Env> = result.data;
