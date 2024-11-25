import express from "express";
import Event from "@/models/event";

export const getEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { search } = req.query;
    const query = search ? { title: new RegExp(search as string, "i") } : {};
    const events = await Event.find(query);
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const searchEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { query } = req.query;
    const search = query ? { title: new RegExp(query as string, "i") } : {};
    const events = await Event.find(search);
    res.status(200).json(events);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update and Delete handlers omitted for brevity.
