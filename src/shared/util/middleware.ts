import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../user/service/auth-service";
import { logger } from "./logger";

export class Middleware {
  constructor(private readonly authService: IAuthService) {}

  logRequest() {
    return (req: Request, res: Response, next: NextFunction) => {
      const startHrTime = process.hrtime();

      res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs =
          elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

        logger.info("request", { url: req.originalUrl, elapsedTimeInMs });
      });

      return next();
    };
  }

  ensureAuthenticated() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["authorization"];

      if (token) {
        const decoded = this.authService.verifyJWT(token);

        if (!decoded) {
          return this.end(403, "Token signature expired.", res);
        }

        const { email } = decoded as any;

        const tokens = await this.authService.getTokens(email);

        if (tokens.length > 0) {
          req.user = decoded;
          return next();
        } else {
          return this.end(
            403,
            "Auth token not found. User is logged out. Try again",
            res
          );
        }
      } else {
        return this.end(403, "No access token provided", res);
      }
    };
  }

  private end(
    status: 400 | 401 | 403,
    message: string,
    res: Response
  ): Response {
    return res.status(status).send({ message });
  }
}
