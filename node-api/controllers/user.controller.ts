import express from "express";
import User from "@/models/user";

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const { search } = req.query;
    const query = search ? { name: new RegExp(search as string, "i") } : {};
    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const searchUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { query } = req.query;
    const search = query ? { name: new RegExp(query as string, "i") } : {};
    const users = await User.find(search);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update and Delete handlers omitted for brevity.
