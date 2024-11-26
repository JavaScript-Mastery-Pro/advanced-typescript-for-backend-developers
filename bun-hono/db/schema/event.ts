import {
  pgTable,
  serial,
  text,
  pgEnum,
  date,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { users } from "./user";

export const eventTypeEnum = pgEnum("event_type", ["talk", "workshop"]);

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: varchar("description"),
  date: date("date").notNull(),
  event_type: eventTypeEnum("event_type").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const insertSchema = createInsertSchema(events);
export const selectSchema = createSelectSchema(events);
