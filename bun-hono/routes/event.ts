import { Hono } from "hono";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
} from "@/controllers/event";

const eventRoutes = new Hono();

eventRoutes.post("/", createEventController);
eventRoutes.get("/", getAllEventsController);
eventRoutes.get("/:id", getEventByIdController);
eventRoutes.put("/:id", updateEventController);
eventRoutes.delete("/:id", deleteEventController);

export default eventRoutes;
