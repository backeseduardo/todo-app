import { Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "./logger";

export abstract class BaseController {
  //@ts-ignore
  protected req: Request;
  //@ts-ignore
  protected res: Response;

  protected abstract executeImpl(): Promise<void | any>;

  execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  public ok<T>(res?: T) {
    if (!!res) {
      return this.res.status(200).json(res);
    } else {
      return this.res.sendStatus(200);
    }
  }

  public fail(error: ZodError | Error | string | unknown, className?: string) {
    let message;

    if (error instanceof ZodError) {
      message = error.issues.reduce(
        (acc, err) => acc + (acc === "" ? "" : ", ") + err.message,
        ""
      );
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = error;
    }

    logger.error(className ?? "", { message });

    return this.res.status(500).json({
      message,
    });
  }
}
