import {
  controller,
  httpGet,
  httpPost,
  response,
  request,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import TYPES from "@/constants/types";
import { EventService } from "@/services/event";

@controller("/api/events")
export class EventController {
  constructor(@inject(TYPES.EventService) private eventService: EventService) {}

  @httpGet("/")
  public async getUsers(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    const users = await this.eventService.getAll();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  }

  @httpPost("/")
  public async newUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    try {
      const user = await this.eventService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Error creating user", error });
    }
  }
}
