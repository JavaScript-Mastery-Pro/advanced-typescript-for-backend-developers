import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/env";
import { events, users } from "./schema";

const client = new Pool({ connectionString: env.DATABASE_URL });

const db = drizzle(client);

async function seed() {
  try {
    // Seed users
    console.log("Seeding users...");
    const insertedUsers = await db.insert(users).values([
      {
        id: 1,
        name: "Alice Doe",
        email: "alice@example.com",
        role: "admin",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "user",
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "user",
      },
    ]);
    console.log("Users seeded:", insertedUsers);

    // Seed events
    console.log("Seeding events...");
    const insertedEvents = await db.insert(events).values([
      {
        title: "Tech Talk: AI in 2024",
        description:
          "A discussion about the future of AI and its impact on society.",
        date: "2024-12-01",
        event_type: "talk",
        userId: 3,
      },
      {
        title: "JavaScript Workshop",
        description:
          "Hands-on coding session for developers new to JavaScript.",
        date: "2024-12-05",
        event_type: "workshop",
        userId: 2,
      },
      {
        title: "React 101",
        description: "A beginner's guide to building web apps with React.",
        date: "2024-12-10",
        event_type: "workshop",
        userId: 1,
      },
    ]);
    console.log("Events seeded:", insertedEvents);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.end();
  }
}

seed();
