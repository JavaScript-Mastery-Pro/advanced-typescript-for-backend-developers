import { Hono } from "hono";
import eventRoutes from "@/routes/event";

const apiV1 = new Hono().basePath("/api/v1");

apiV1.route("/events", eventRoutes);

export default apiV1;
