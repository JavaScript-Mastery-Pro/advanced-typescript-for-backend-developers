import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { LogService } from "@/services/log";
import TYPES from "@/constants/types";

export class LoggingMiddleware {
  constructor(@inject(TYPES.LogService) private logService: LogService) {}

  public logRequest(req: Request, res: Response, next: NextFunction): void {
    const message = `Incoming request: ${req.method} ${req.originalUrl}`;
    this.logService.logInfo(message); // Log the incoming request
    next(); // Pass the request to the next middleware/handler
  }
}
