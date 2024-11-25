import request from "supertest";
import mongoose from "mongoose";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

import Event from "@/models/event";
import eventRoutes from "@/routes/event.routes";

describe("Event API", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/events", eventRoutes);
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: "node-api_test",
    });
  });

  afterAll(async () => {
    await Event.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new event", async () => {
    const response = await request(app).post("/api/events").send({
      title: "Test Event",
      description: "Test Description",
      date: new Date(),
      type: "workshop",
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Event");
  });

  it("should search events by title", async () => {
    const response = await request(app).get("/api/events/search?query=Test");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
