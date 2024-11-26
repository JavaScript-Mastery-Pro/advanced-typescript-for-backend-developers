import { Context } from "hono";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "@/services/event";
import { NewEvent } from "@/types/event";
import { CreatedResponse, OkResponse } from "@/utils/success.responses";
import { NotFoundError } from "@/utils/error.responses";

export const createEventController = async (c: Context) => {
  try {
    const eventData = await c.req.json();
    const newEvent = await createEvent(eventData as any);

    const response = new CreatedResponse(
      newEvent,
      "Event created successfully"
    );
    return c.json(response);
  } catch (err) {
    throw err;
  }
};

export const getAllEventsController = async (c: Context) => {
  try {
    const events = await getAllEvents();

    let response;
    if (events.length === 0) {
      response = new OkResponse(events, "No events found");
    } else {
      response = new OkResponse(events, "Events fetched successfully");
    }

    return c.json(response);
  } catch (err) {
    throw err;
  }
};

export const getEventByIdController = async (c: Context) => {
  try {
    const eventId = Number(c.req.param("id"));
    const event = await getEventById(eventId);

    let response;
    if (!event) {
      response = new OkResponse(event, "Event not found");
    } else {
      response = new OkResponse(event, "Event fetched successfully");
    }

    return c.json(response);
  } catch (err) {
    throw err;
  }
};

export const updateEventController = async (c: Context) => {
  try {
    const eventId = Number(c.req.param("id"));
    const eventData: Partial<NewEvent> = await c.req.json();
    const updatedEvent = await updateEvent(eventId, eventData);

    const response = new OkResponse(updatedEvent, "Event updated successfully");
    return c.json(response);
  } catch (err) {
    throw err;
  }
};

export const deleteEventController = async (c: Context) => {
  try {
    const eventId = Number(c.req.param("id"));
    const result = await deleteEvent(eventId);

    if (!result) throw new NotFoundError("Event", "EVENT_NOT_FOUND");
    const response = new OkResponse(result, "Event deleted successfully");

    return c.json(response);
  } catch (err) {
    throw err;
  }
};
