import express from "express";
import {
  createUser,
  getUsers,
  searchUsers,
} from "@/controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/search", searchUsers);

export default router;
