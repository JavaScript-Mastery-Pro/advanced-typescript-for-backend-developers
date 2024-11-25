import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import { env } from "@/env";

dotenv.config();

const app = express();
const port = env.PORT;

mongoose
  .connect(env.DATABASE_URL, {
    dbName: "advanced_node",
  })
  .then(() => console.log("🍀 Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port);

console.log(`🚀 Server is running in ${env.NODE_ENV} mode on port ${port}`);
