import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

import { events } from "@/db/schema/event";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type EventEnum = "talk" | "workshop";
