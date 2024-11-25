import express from "express";
import {
  createEvent,
  getEvents,
  searchEvents,
} from "@/controllers/event.controller";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/search", searchEvents);

export default router;
