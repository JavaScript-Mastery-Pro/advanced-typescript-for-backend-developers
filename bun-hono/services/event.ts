import { eq } from "drizzle-orm";

import { connect } from "@/db/connect";
import { events, insertSchema } from "@/db/schema/event";

import { NewEvent, Event } from "@/types/event";
import { ApiError, NotFoundError } from "@/utils/error.responses";

export const createEvent = async (eventData: NewEvent): Promise<Event> => {
  const db = connect();

  const {
    data: validatedData,
    success,
    error,
  } = insertSchema.safeParse(eventData);

  if (!success) {
    console.log("Validation error:", validatedData);
    throw new ApiError(
      400,
      "Validation error: Invalid event data",
      "INVALID_EVENT_DATA"
    );
  }

  const [newEvent] = await db.insert(events).values(validatedData).returning();
  return newEvent;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const db = connect();

  const eventsList = await db.select().from(events);
  return eventsList;
};

export const getEventById = async (eventId: number): Promise<Event> => {
  const db = connect();

  const event = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId))
    .limit(1);

  return event[0] || null;
};

export const updateEvent = async (
  eventId: number,
  eventData: Partial<Event>
): Promise<Event | null> => {
  const db = connect();

  const validatedData = insertSchema.parse(eventData);

  const [updatedEvent] = await db
    .update(events)
    .set(validatedData)
    .where(eq(events.id, eventId))
    .returning();

  return updatedEvent || null;
};

export const deleteEvent = async (eventId: number) => {
  const db = connect();

  const deleteResult = await db.delete(events).where(eq(events.id, eventId));

  if (deleteResult.rowCount === 0) {
    throw new NotFoundError("Event", "EVENT_NOT_FOUND");
  }

  return deleteResult;
};
