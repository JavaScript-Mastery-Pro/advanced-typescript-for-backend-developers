import { OpenAPIHono } from "@hono/zod-openapi";

import apiV1 from "@/api/v1/main";
import apiV2 from "@/api/v2/main";

import { ResponseMiddleware } from "@/middlewares/response";

const app = new OpenAPIHono({ strict: false });

app.use("*", ResponseMiddleware);

app.route("/", apiV1);
app.route("/", apiV2);

export default app;
