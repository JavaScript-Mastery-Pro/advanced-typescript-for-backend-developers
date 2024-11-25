import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  response,
  request,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request, Response } from "express";

import TYPES from "@/constants/types";
import { LogService } from "@/services/log";
import { UserService } from "@/services/user";

@controller("/api/users")
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.LogService) private logService: LogService
  ) {}

  @httpGet("/")
  public async getUsers(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    this.logService.logInfo(`[GET] ${req.originalUrl} - Fetching users`);

    const users = await this.userService.getUsers();
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
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Error creating user", error });
    }
  }

  @httpPut("/:id")
  public async updateUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    const updatedUser = await this.userService.updateUser(
      req.params.id,
      req.body
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  }

  @httpDelete("/:id")
  public async deleteUser(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    const deletedUser = await this.userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  }
}
