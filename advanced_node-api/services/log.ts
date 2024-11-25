import { injectable } from "inversify";
import winston from "winston";

@injectable()
export class LogService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" }),
      ],
    });
  }

  public logInfo(message: string): void {
    this.logger.info(message);
  }

  public logError(message: string): void {
    this.logger.error(message);
  }

  public logWarning(message: string): void {
    this.logger.warn(message);
  }

  public logDebug(message: string): void {
    this.logger.debug(message);
  }
}
