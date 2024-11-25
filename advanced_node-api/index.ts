import "reflect-metadata";
import mongoose from "mongoose";
import * as express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import { env } from "@/env";
import TYPES from "@/constants/types";
import { LogService } from "@/services/log";
import { UserService } from "@/services/user";
import { EventService } from "@/services/event";

import "@/controllers/user.controller";
import "@/controllers/event.controller";

import { LoggingMiddleware } from "@/middlewares/logger";

const port = env.PORT;

let container = new Container();

container.bind<LogService>(TYPES.LogService).to(LogService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<EventService>(TYPES.EventService).to(EventService);
container
  .bind<LoggingMiddleware>(TYPES.LoggingMiddleware)
  .to(LoggingMiddleware); // Bind the middleware to DI

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  const loggingMiddleware = container.get<LoggingMiddleware>(
    TYPES.LoggingMiddleware
  );
  app.use(loggingMiddleware.logRequest.bind(loggingMiddleware));
});

let app = server.build();

mongoose
  .connect(env.DATABASE_URL, {
    dbName: "advanced_node",
  })
  .then(() => console.log("🍀 Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port);

console.log(`🚀 Server is running in ${env.NODE_ENV} mode on port ${port}`);
