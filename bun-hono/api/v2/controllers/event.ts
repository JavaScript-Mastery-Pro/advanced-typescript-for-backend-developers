import { Context } from "hono";

import { getAllEvents } from "@/services/event";
import { OkResponse } from "@/utils/success.responses";

export const getAllEventsControllerV2 = async (c: Context) => {
  try {
    const events = await getAllEvents();

    const response = new OkResponse(
      events,
      "Events for api v2 fetched successfully"
    );
    return c.json(response);
  } catch (err) {
    throw err;
  }
};
