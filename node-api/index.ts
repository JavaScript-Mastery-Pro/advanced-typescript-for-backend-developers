import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "@/routes/user.routes"
import eventRoutes from "@/routes/event.routes";

export const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

mongoose
  .connect(process.env.DATABASE_URL as string, {
    dbName: "node-express",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
