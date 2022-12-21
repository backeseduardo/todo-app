import winston from "winston";
import { config } from "../../../config";
import { ILogger } from "./logger";

export class WinstonLogger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: { service: config.serviceName },
      level: config.isProduction ? "info" : "debug",
    });

    if (config.isProduction) {
      // Write all logs with importance level of `error` or less to `error.log`
      this.logger.add(
        new winston.transports.File({ filename: "error.log", level: "error" })
      );
      // Write all logs with importance level of `info` or less to `combined.log`
      this.logger.add(
        new winston.transports.File({ filename: "combined.log" })
      );
    } else {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(message, meta);
  }
  warn(message: string, meta?: unknown): void {
    this.logger.warn(message, meta);
  }
  info(message: string, meta?: unknown): void {
    this.logger.info(message, meta);
  }
  debug(message: string, meta?: unknown): void {
    this.logger.debug(message, meta);
  }
}
