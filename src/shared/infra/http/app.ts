import express from "express";
import { middleware } from "..";
import "../../../config/index";
import { config } from "../../../config/index";
import { logger } from "../../util/logger";
import { v1Router } from "./api/v1";

const app = express();
app.use(express.json());

app.use("/api/v1", middleware.logRequest(), v1Router);

const server = app.listen(config.http.port, () =>
  logger.info(`Express app started at port ${config.http.port}`)
);

function shutdown() {
  if (!config.isProduction) {
    return;
  }

  logger.info("SIGTERM signal received: closing HTTP server");

  server.close(() => {
    logger.info("HTTP server closed");
  });
}

// ctrl+c
process.on("SIGINT", () => shutdown());
// kill command
process.on("SIGTERM", () => shutdown());
