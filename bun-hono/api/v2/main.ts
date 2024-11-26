import { Hono } from "hono";
import eventRoutes from "@/routes/event";
import { getAllEventsControllerV2 } from "./controllers/event";

const apiV2 = new Hono().basePath("/api/v2");

apiV2.get("/events", getAllEventsControllerV2);
apiV2.route("/events", eventRoutes);

export default apiV2;
