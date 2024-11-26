import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const connect = () => {
  const db = drizzle(neon(process.env.DATABASE_URL!));
  return db;
};
