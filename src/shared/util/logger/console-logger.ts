import { ILogger } from "./logger";

export class ConsoleLogger implements ILogger {
  error(message: string, meta?: unknown): void {
    console.error(message, meta);
  }
  warn(message: string, meta?: unknown): void {
    console.warn(message, meta);
  }
  info(message: string, meta?: unknown): void {
    console.info(message, meta);
  }
  debug(message: string, meta?: unknown): void {
    console.debug(message, meta);
  }
}
