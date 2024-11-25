import request from "supertest";
import mongoose from "mongoose";
import express from "express";

import dotenv from "dotenv";
dotenv.config();

import User from "@/models/user";
import userRoutes from "@/routes/user.routes";

describe("User API", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/users", userRoutes);
  });

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: "node-api_test",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      email: "test@example.com",
      role: "user",
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test User");
  });

  it("should search users by name", async () => {
    const response = await request(app).get("/api/users/search?query=Test");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
