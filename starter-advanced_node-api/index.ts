import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 2000;

mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: "advanced_node",
  })
  .then(() => console.log("🍀 Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port);

console.log(
  `🚀 Server is running in ${process.env.NODE_ENV} mode on port ${port}`
);
