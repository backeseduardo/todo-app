import "reflect-metadata";
import { config } from "../../../../config";
import { logger } from "../../../util/logger";
import { TypeORMDataSource } from "./data-source";

logger.info("TypeORM initializing", { host: config.database.host });

TypeORMDataSource.initialize()
  .then(() => logger.info("TypeORM is ready"))
  .catch((error) => logger.error(error));

function shutdown() {
  logger.info("TypeORM shutting down");

  TypeORMDataSource.destroy()
    .then(() => {
      logger.info("TypeORM shutdown");
    })
    .catch((error) => logger.error(error));
}

// ctrl+c
// process.on("SIGINT", () => shutdown());
// kill command
// process.on("SIGTERM", () => shutdown());
